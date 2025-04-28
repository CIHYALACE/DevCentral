import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Spotify', category: 'Music', rating: 4.5, downloads: '1M+' },
    { id: 2, name: 'Netflix', category: 'Entertainment', rating: 4.7, downloads: '5M+' }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: '',
    category: '',
    description: ''
  });

  const handleAddProgram = () => {
    // Add program logic
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Programs Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Program
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Downloads</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>{program.category}</td>
              <td>{program.rating}</td>
              <td>{program.downloads}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Program Name</Form.Label>
              <Form.Control 
                type="text" 
                value={newProgram.name}
                onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type="text" 
                value={newProgram.category}
                onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={newProgram.description}
                onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProgram}>
            Add Program
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}