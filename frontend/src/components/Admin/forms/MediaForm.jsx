import React, { useState, useEffect } from "react";
import { Form, Image, Spinner } from "react-bootstrap";
import { generateVideoThumbnail } from "../../../utils/uiHelpers";

export default function MediaForm({ newMedia, setNewMedia, programs = [] }) {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate preview when file changes
  useEffect(() => {
    if (!newMedia.file) {
      setPreview(null);
      return;
    }

    const generatePreview = async () => {
      setIsLoading(true);
      try {
        // For videos, generate a thumbnail
        if (newMedia.media_type === 'video') {
          const fileUrl = URL.createObjectURL(newMedia.file);
          const thumbnail = await generateVideoThumbnail(fileUrl);
          setPreview(thumbnail);
          URL.revokeObjectURL(fileUrl); // Clean up
        } else {
          // For images, just create an object URL
          const fileUrl = URL.createObjectURL(newMedia.file);
          setPreview(fileUrl);
        }
      } catch (error) {
        console.error('Error generating preview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();

    // Clean up function
    return () => {
      if (preview && !preview.startsWith('data:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [newMedia.file, newMedia.media_type]);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Media Type</Form.Label>
        <Form.Select
          value={newMedia.media_type}
          onChange={(e) => setNewMedia({ ...newMedia, media_type: e.target.value })}
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
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.title || program.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>File</Form.Label>
        <Form.Control
          type="file"
          accept={newMedia.media_type === 'video' ? 'video/*' : 'image/*'}
          onChange={(e) =>
            setNewMedia({ ...newMedia, file: e.target.files[0] })
          }
        />
      </Form.Group>

      {/* Preview section */}
      {newMedia.file && (
        <div className="mb-3">
          <Form.Label>Preview</Form.Label>
          <div className="media-preview border rounded p-2">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <Spinner animation="border" />
              </div>
            ) : preview ? (
              <div className="text-center">
                <div className="position-relative d-inline-block">
                  <Image
                    src={preview}
                    alt="Media preview"
                    style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
                    thumbnail
                  />
                  {newMedia.media_type === 'video' && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <i className="fa-solid fa-play text-white fs-4"></i>
                    </div>
                  )}
                </div>
                <p className="mt-2 mb-0 text-muted small">{newMedia.file.name}</p>
              </div>
            ) : (
              <div className="text-center text-muted" style={{ height: '100px', lineHeight: '100px' }}>
                No preview available
              </div>
            )}
          </div>
        </div>
      )}
    </Form>
  );
}
