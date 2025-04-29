import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import ProgramsForm from "./forms/ProgramsForm";

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Spotify",
      category: "Music",
      rating: 4.5,
      downloads: "1M+",
    },
    {
      id: 2,
      name: "Netflix",
      category: "Entertainment",
      rating: 4.7,
      downloads: "5M+",
    },
  ]);

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
          {programs.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>{program.category}</td>
              <td>{program.rating}</td>
              <td>{program.downloads}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
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
