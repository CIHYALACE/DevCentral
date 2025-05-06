import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Alert, Image, Card } from "react-bootstrap";
import MediaForm from "./forms/MediaForm";
import { adminStore, fetchAdminMedia } from "../../store/adminStore";
import { useStore } from "@tanstack/react-store";
import { Paginator } from "../common/Paginator";
import { generateVideoThumbnail, formatDate } from "../../utils/uiHelpers";

export default function MediaManagement() {
  // Use the store hook to access media data directly
  const mediaData = useStore(adminStore, (state) => state.media);
  const isLoading = useStore(adminStore, (state) => state.loading);
  const programsData = useStore(adminStore, (state) => state.programs);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // State for modal and preview
  const [showModal, setShowModal] = useState(false);
  const [previewModal, setPreviewModal] = useState({ show: false, url: '', type: '' });
  const [thumbnails, setThumbnails] = useState({});
  const [newMedia, setNewMedia] = useState({
    media_type: "screenshot",
    program: "",
    file: null,
  });

  // Fetch media data when component mounts or page changes
  useEffect(() => {
    const loadMedia = async () => {
      try {
        await fetchAdminMedia(currentPage, itemsPerPage);
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };
    
    loadMedia();
  }, [currentPage, itemsPerPage]);

  // Generate thumbnails for videos when media data changes
  useEffect(() => {
    const generateThumbnails = async () => {
      const media = mediaData?.data || [];
      const newThumbnails = { ...thumbnails };
      
      for (const item of media) {
        // Only generate thumbnails for videos that don't already have one
        if (item.media_type === 'video' && item.file && !thumbnails[item.id]) {
          try {
            const thumbnail = await generateVideoThumbnail(item.file);
            newThumbnails[item.id] = thumbnail;
          } catch (error) {
            console.error(`Error generating thumbnail for video ${item.id}:`, error);
          }
        }
      }
      
      setThumbnails(newThumbnails);
    };
    
    if (mediaData?.data?.length > 0) {
      generateThumbnails();
    }
  }, [mediaData?.data]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddMedia = async () => {
    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      
      // Add all media data to FormData
      formData.append('media_type', newMedia.media_type);
      formData.append('program', newMedia.program);
      if (newMedia.file) {
        formData.append('file', newMedia.file);
      }
      
      // TODO: Implement actual API call to add media
      console.log("Adding media:", newMedia);
      setShowModal(false);
      
      // Reset form
      setNewMedia({
        media_type: "screenshot",
        program: "",
        file: null,
      });
      
      // Refresh the media list
      await fetchAdminMedia(currentPage, itemsPerPage);
    } catch (error) {
      console.error('Error adding media:', error);
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      // Delete media logic
      console.log(`Delete media ${id}`);
      
      // Refresh the media list after deletion
      await fetchAdminMedia(currentPage, itemsPerPage);
    } catch (error) {
      console.error(`Error deleting media ${id}:`, error);
    }
  };

  // Get data from store
  const media = mediaData?.data || [];
  const totalItems = mediaData?.totalItems || 0;
  const hasError = mediaData?.error != null;
  const programs = programsData?.data || [];
  
  // Helper function to get media type label
  const getMediaTypeLabel = (type) => {
    switch (type) {
      case 'screenshot': return 'Screenshot';
      case 'video': return 'Video';
      case 'banner': return 'Banner';
      default: return type;
    }
  };
  
  // Helper function to open preview modal
  const openPreview = (url, type) => {
    setPreviewModal({ show: true, url, type });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading media...</span>
        </Spinner>
        <p className="mt-2">Loading media data...</p>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Media</Alert.Heading>
        <p>{mediaData?.error?.detail || 'An error occurred while loading media data'}</p>
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <h2>Media Management</h2> */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Media
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>

            <th>Preview</th>
            <th>Type</th>
            <th>Program</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.length > 0 ? (
            media.map((item) => (
              <tr key={item.id}>

                <td style={{ width: '120px' }}>
                  {item.file ? (
                    <div 
                      className="media-thumbnail" 
                      onClick={() => openPreview(item.file, item.media_type)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.media_type === 'video' ? (
                        <div className="position-relative">
                          {thumbnails[item.id] ? (
                            <Image 
                              src={thumbnails[item.id]} 
                              alt="Video thumbnail" 
                              width={100} 
                              height={100} 
                              style={{ objectFit: 'cover' }} 
                              thumbnail 
                            />
                          ) : (
                            <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: 100, height: 100 }}>
                              <Spinner animation="border" size="sm" />
                            </div>
                          )}
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <i className="fa-solid fa-play text-white"></i>
                          </div>
                        </div>
                      ) : (
                        <Image 
                          src={item.file} 
                          alt={`${item.media_type} preview`} 
                          width={100} 
                          height={100} 
                          style={{ objectFit: 'cover' }} 
                          thumbnail 
                        />
                      )}
                    </div>
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: 100, height: 100 }}>
                      <span className="text-muted">No file</span>
                    </div>
                  )}
                </td>
                <td>{getMediaTypeLabel(item.media_type)}</td>
                <td>{item.program || 'Unknown'}</td>
                <td>{item.uploaded_at ? formatDate(item.uploaded_at) : 'Unknown'}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => openPreview(item.file, item.media_type)}
                  >
                    View
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteMedia(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No media found</td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {/* Pagination */}
      <Paginator
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        maxPageButtons={5}
      />

      {/* Add Media Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MediaForm newMedia={newMedia} setNewMedia={setNewMedia} programs={programs} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMedia}
            disabled={!newMedia.media_type || !newMedia.program || !newMedia.file}
          >
            Add Media
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Preview Modal */}
      <Modal 
        show={previewModal.show} 
        onHide={() => setPreviewModal({ show: false, url: '', type: '' })}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Media Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          {previewModal.type === 'video' ? (
            <video 
              src={previewModal.url} 
              controls 
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
              className="my-2"
            />
          ) : (
            <Image 
              src={previewModal.url} 
              alt="Media preview" 
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} 
              className="my-2"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setPreviewModal({ show: false, url: '', type: '' })}
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            href={previewModal.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Open Original
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
