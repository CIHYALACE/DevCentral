import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import MediaForm from "./forms/MediaForm";

export default function MediaManagement() {
  const [media, setMedia] = useState([
    {
      id: 1,
      type: "screenshot",
      program: "Spotify",
      file: "spotify-1.jpg",
      uploadDate: "2025-04-28",
    },
    {
      id: 2,
      type: "banner",
      program: "Netflix",
      file: "netflix-banner.jpg",
      uploadDate: "2025-04-27",
    },
  ]);

  const [programs, setProgram] = useState([
    { id: 1, name: "Spotify" },
    { id: 2, name: "Netflix" },
    { id: 3, name: "YouTube" },
    { id: 4, name: "Twitch" },
    { id: 5, name: "Discord" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: "screenshot",
    program: "",
    file: null,
  });

  const handleUpload = () => {
    // Handle media upload logic here
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Media Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Upload New Media
        </Button>
      </div>

      <Table striped bordered hover>
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
          {media.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.program}</td>
              <td>{item.file}</td>
              <td>{item.uploadDate}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  View
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
          <Modal.Title>Upload New Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MediaForm
            newMedia={newMedia}
            setNewMedia={setNewMedia}
            programs={programs}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!newMedia.file || !newMedia.program || !newMedia.type}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
