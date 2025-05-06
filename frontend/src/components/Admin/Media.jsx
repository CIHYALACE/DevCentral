import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Alert } from "react-bootstrap";
import MediaForm from "./forms/MediaForm";
import { adminStore, fetchAdminMedia } from "../../store/adminStore";

export default function MediaManagement() {
  // State for media data from the store
  const [mediaData, setMediaData] = useState({
    data: [],
    loading: true,
    error: null
  });

  const [showModal, setShowModal] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: "",
    program: "",
    file: null,
  });

  // Subscribe to admin store and fetch media data
  useEffect(() => {
    const unsubscribe = adminStore.subscribe(state => {
      // Make sure media exists in the state before updating local state
      if (state && state.media) {
        setMediaData(state.media);
      }
    });
    
    // Fetch media data when component mounts
    const loadMedia = async () => {
      try {
        await fetchAdminMedia();
      } catch (error) {
        console.error('Error loading media:', error);
        // Update state with error even if the store update fails
        setMediaData(prev => ({
          ...prev,
          loading: false,
          error: { detail: error.message || 'Failed to load media' }
        }));
      }
    };
    
    loadMedia();
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddMedia = () => {
    // Add media logic
    console.log("Adding media:", newMedia);
    setShowModal(false);
  };

  const handleDeleteMedia = (id) => {
    // Delete media logic
    console.log(`Delete media ${id}`);
  };

  // Safely check loading state
  const isLoading = mediaData?.loading === true;
  
  // Safely check error state
  const hasError = mediaData?.error != null;
  
  // Safely get data
  const media = mediaData?.data || [];

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
            <th>ID</th>
            <th>Type</th>
            <th>Program</th>
            <th>File</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.length > 0 ? (
            media.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.program?.name || 'Unknown'}</td>
                <td>
                  {item.file_url ? (
                    <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  ) : (
                    'No file'
                  )}
                </td>
                <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'}</td>
                <td>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MediaForm newMedia={newMedia} setNewMedia={setNewMedia} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMedia}
            disabled={!newMedia.type || !newMedia.program || !newMedia.file}
          >
            Add Media
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
