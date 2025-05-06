import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { useStore } from "@tanstack/react-store";
import { adminStore, fetchAdminPrograms } from "../../store/adminStore";
import { programStore, addProgram, updateProgram, fetchProgramDetails } from "../../store/programStore";
import { categoryStore, fetchCategories } from "../../store/categoryStore";
import { Paginator } from "../common/Paginator";
import ProgramForm from "../../components/ProgramForm";
import { Link } from "react-router-dom";

export default function ProgramsManagement() {
  // Use the store hook to access programs data directly
  const programsData = useStore(adminStore, (state) => state.programs);
  const isLoading = useStore(programStore, (state) => state.loading);
  const categories = useStore(categoryStore, (state) => state.categories);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formTitle, setFormTitle] = useState('Add New Program');
  const [submitButtonText, setSubmitButtonText] = useState('Add Program');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // State for program form data
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    type: "app", // Default to app
    category: "",
    developer_id: "",
    price: 0,
    release_date: "",
    last_update_date: "",
    rating: 0,
    download_count: 0,
    icon: null,
    download_url: "",
    is_published: false,
  });
  
  // State for media files
  const [mediaFiles, setMediaFiles] = useState({
    screenshots: [],
    videos: [],
    banners: []
  });
  
  // State for video thumbnails
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  
  // State for existing media
  const [existingMedia, setExistingMedia] = useState({
    screenshots: [],
    videos: [],
    banners: []
  });
  
  // State for media to delete
  const [mediaToDelete, setMediaToDelete] = useState([]);
  
  // Fetch programs data when component mounts or page changes
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        await fetchAdminPrograms(currentPage, itemsPerPage);
      } catch (error) {
        console.error('Error loading programs:', error);
      }
    };
    
    loadPrograms();
  }, [currentPage, itemsPerPage]);
  
  // Fetch categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories();
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle opening the modal for adding a new program
  const handleAddProgramClick = () => {
    // Reset form data
    setFormData({
      title: "",
      slug: "",
      description: "",
      type: "app", // Default to app
      category: "",
      developer_id: "",
      price: 0,
      release_date: "",
      last_update_date: "",
      rating: 0,
      download_count: 0,
      icon: null,
      download_url: "",
      is_published: false,
    });
    
    // Reset media files
    setMediaFiles({
      screenshots: [],
      videos: [],
      banners: []
    });
    
    // Reset video thumbnails
    setVideoThumbnails([]);
    
    // Reset existing media
    setExistingMedia({
      screenshots: [],
      videos: [],
      banners: []
    });
    
    // Reset media to delete
    setMediaToDelete([]);
    
    // Set modal title and button text
    setFormTitle('Add New Program');
    setSubmitButtonText('Add Program');
    
    // Reset error and success states
    setSubmitError(null);
    setSubmitSuccess(false);
    
    // Set edit mode to false
    setIsEditMode(false);
    
    // Show the modal
    setShowModal(true);
  };
  
  // Handle opening the modal for editing a program
  const handleEditProgramClick = async (programId) => {
    try {
      // Set loading state
      programStore.setState((state) => ({ ...state, loading: true }));
      
      // Fetch program details
      const program = await fetchProgramDetails(programId);
      
      // Format the program data for the form
      setFormData({
        id: program.id,
        title: program.title || "",
        slug: program.slug || "",
        description: program.description || "",
        type: program.type || "app",
        category: program.category?.id || "",
        developer_id: program.developer_id || "",
        price: program.price || 0,
        release_date: program.release_date || "",
        last_update_date: program.last_update_date || "",
        rating: program.rating || 0,
        download_count: program.download_count || 0,
        icon: program.icon || null,
        download_url: program.download_url || "",
        is_published: program.is_published || false,
      });
      
      // Set existing media
      const screenshots = program.media?.filter(m => m.media_type === 'screenshot') || [];
      const videos = program.media?.filter(m => m.media_type === 'video') || [];
      const banners = program.media?.filter(m => m.media_type === 'banner') || [];
      
      setExistingMedia({
        screenshots: screenshots.map(s => ({ id: s.id, file: s.file })),
        videos: videos.map(v => ({ id: v.id, file: v.file })),
        banners: banners.map(b => ({ id: b.id, file: b.file }))
      });
      
      // Reset media files
      setMediaFiles({
        screenshots: [],
        videos: [],
        banners: []
      });
      
      // Reset video thumbnails
      setVideoThumbnails([]);
      
      // Reset media to delete
      setMediaToDelete([]);
      
      // Set modal title and button text
      setFormTitle('Edit Program');
      setSubmitButtonText('Update Program');
      
      // Reset error and success states
      setSubmitError(null);
      setSubmitSuccess(false);
      
      // Set edit mode to true
      setIsEditMode(true);
      
      // Show the modal
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching program details:', error);
    } finally {
      // Reset loading state
      programStore.setState((state) => ({ ...state, loading: false }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error and success states
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Create FormData object to handle file uploads
      const programFormData = new FormData();
      
      // Add all program data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== 'id') {
          programFormData.append(key, value);
        }
      });
      
      let response;
      
      if (isEditMode) {
        // Update existing program
        response = await updateProgram(formData.slug, programFormData, mediaFiles, mediaToDelete);
      } else {
        // Add new program
        response = await addProgram(programFormData, mediaFiles);
      }
      
      // Set success state
      setSubmitSuccess(true);
      
      // Close modal after a short delay
      setTimeout(() => {
        setShowModal(false);
        
        // Refresh the programs list
        fetchAdminPrograms(currentPage, itemsPerPage);
      }, 1500);
      
      return response;
    } catch (error) {
      console.error('Error submitting program:', error);
      setSubmitError(error.response?.data?.detail || 'An error occurred while submitting the program');
      return null;
    }
  };
  
  // Handle removing existing media
  const handleRemoveExistingMedia = (mediaType, index) => {
    // Get the media item to remove
    const mediaItem = existingMedia[mediaType][index];
    
    // Add the media ID to the list of media to delete
    if (mediaItem && mediaItem.id) {
      setMediaToDelete(prev => [...prev, mediaItem.id]);
    }
    
    // Remove the media item from the existing media list
    setExistingMedia(prev => {
      const updatedMedia = { ...prev };
      updatedMedia[mediaType] = [...prev[mediaType]];
      updatedMedia[mediaType].splice(index, 1);
      return updatedMedia;
    });
  };

  // Get data from store
  const programs = programsData?.data || [];
  const totalItems = programsData?.totalItems || 0;
  const hasError = programsData?.error != null;

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading programs...</span>
        </Spinner>
        <p className="mt-2">Loading programs data...</p>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Programs</Alert.Heading>
        <p>{programsData?.error?.detail || 'An error occurred while loading programs data'}</p>
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <h2>Programs Management</h2> */}
        <Button variant="primary" onClick={handleAddProgramClick}>
          Add New Program
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>

            <th>Name</th>
            <th>Type</th>
            <th>Developer</th>
            <th>Created</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.length > 0 ? (
            programs.map((program) => (
              <tr key={program.id}>
                <td>
                <Link to={`/details/_/${program.slug}`}>
                  {program.title}
                </Link>
                  </td>
                <td>{program.type}</td>
                <td>{program.developer || 'Unknown'}</td>
                <td>{program.created_at ? new Date(program.created_at).toLocaleDateString() : 'Unknown'}</td>
                <td>
                  <span className={`badge bg-${program.is_published ? 'success' : 'danger'}`}>
                    {program.is_published ? 'Published' : 'Not Published'}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEditProgramClick(program.slug)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No programs found</td>
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

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgramForm
            formTitle=""
            formData={formData}
            setFormData={setFormData}
            mediaFiles={mediaFiles}
            setMediaFiles={setMediaFiles}
            videoThumbnails={videoThumbnails}
            setVideoThumbnails={setVideoThumbnails}
            existingMedia={existingMedia}
            removeExistingMedia={handleRemoveExistingMedia}
            categories={categories}
            handleSubmit={handleSubmit}
            submitLoading={isLoading}
            submitError={submitError}
            submitSuccess={submitSuccess}
            submitButtonText={submitButtonText}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
