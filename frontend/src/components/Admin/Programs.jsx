import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Alert } from "react-bootstrap";
import ProgramsForm from "./forms/ProgramsForm";
import { adminStore, fetchAdminPrograms } from "../../store/adminStore";

export default function ProgramsManagement() {
  // State for programs data from the store
  const [programsData, setProgramsData] = useState({
    data: [],
    loading: true,
    error: null
  });
  
  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [newProgram, setNewProgram] = useState({
    title: "",
    slug: "",
    description: "",
    type: "",
    category: "",
    developerId: "",
    price: 0,
    releaseDate: "",
    lastUpdateDate: "",
    rating: 0,
    downloadCount: 0,
    icon: null,
    downloadUrl: "",
    isPublished: false,
  });

  // Subscribe to admin store and fetch programs data
  useEffect(() => {
    const unsubscribe = adminStore.subscribe(state => {
      // Make sure programs exists in the state before updating local state
      if (state && state.programs) {
        setProgramsData(state.programs);
      }
    });
    
    // Fetch programs data when component mounts
    const loadPrograms = async () => {
      try {
        await fetchAdminPrograms();
      } catch (error) {
        console.error('Error loading programs:', error);
        // Update state with error even if the store update fails
        setProgramsData(prev => ({
          ...prev,
          loading: false,
          error: { detail: error.message || 'Failed to load programs' }
        }));
      }
    };
    
    loadPrograms();
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddProgram = () => {
    // Add program logic
    setShowModal(false);
  };

  // Safely check loading state
  const isLoading = programsData?.loading === true;
  
  // Safely check error state
  const hasError = programsData?.error != null;
  
  // Safely get data
  const programs = programsData?.data || [];

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
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Program
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
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
                <td>{program.id}</td>
                <td>{program.name}</td>
                <td>{program.type}</td>
                <td>{program.developer?.name || 'Unknown'}</td>
                <td>{program.created_at ? new Date(program.created_at).toLocaleDateString() : 'Unknown'}</td>
                <td>
                  <span className={`badge bg-${program.is_active ? 'success' : 'danger'}`}>
                    {program.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-2">
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgramsForm newProgram={newProgram} setNewProgram={setNewProgram} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddProgram}
            disabled={
              !newProgram.title ||
              !newProgram.slug ||
              !newProgram.category ||
              !newProgram.type ||
              !newProgram.developerId ||
              !newProgram.description ||
              !newProgram.price ||
              !newProgram.releaseDate ||
              !newProgram.lastUpdateDate ||
              !newProgram.downloadUrl ||
              !newProgram.icon
            }
          >
            Add Program
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
