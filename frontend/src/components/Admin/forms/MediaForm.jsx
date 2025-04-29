import { Form } from "react-bootstrap";
import React from "react";

export default function MediaForm({ newMedia, setNewMedia, programs }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Media Type</Form.Label>
        <Form.Select
          value={newMedia.type}
          onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
        >
          <option value="screenshot">Screenshot</option>
          <option value="banner">Banner</option>
          <option value="video">Video</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Program</Form.Label>
        <Form.Select
          placeholder="Choose a program"
          value={newMedia.program}
          onChange={(e) =>
            setNewMedia({ ...newMedia, program: e.target.value })
          }
        >
          {programs.map((program) => (
            <option key={program.id} value={program.name}>
              {program.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) =>
            setNewMedia({ ...newMedia, file: e.target.files[0] })
          }
        />
      </Form.Group>
    </Form>
  );
}
