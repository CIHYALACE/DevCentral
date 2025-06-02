import React, { useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import "../style/AddProgram.css";
import { useNavigate, useParams } from "react-router-dom";
import { authStore, fetchCategories } from "../store";
import { useStore } from "@tanstack/react-store";
const ProgramForm = ({
  formTitle,
  formData,
  setFormData,
  mediaFiles,
  setMediaFiles,
  videoThumbnails,
  setVideoThumbnails,
  existingMedia = { screenshots: [], videos: [], banners: [] },
  removeExistingMedia = () => {},
  categories = [],
  handleSubmit,
  submitLoading = false,
  submitError = null,
  submitSuccess = false,
  submitButtonText = "Submit",
}) => {
  const { slug } = useParams();
  const editing = slug;
  const navigate = useNavigate()
  const user = useStore(authStore, (state) => state.user);
  useEffect(() => {
    fetchCategories();
    delete formData.icon
    if(formData.category&& !formData.category_id){
      formData.category_id = formData.category
    }
    if(user.role === 'user'){
      navigate('/profile')
    }
    console.log(formData);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file" && name === "icon") {
      // Handle icon file upload
      if (files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          icon: files[0],
        }));
      }
    } else if (type === "file" && name.startsWith("media_")) {
      // Handle media file uploads (screenshots, videos, banners)
      const mediaType = name.split("_")[1]; // Extract media type from name
      if (files.length > 0) {
        const file = files[0];
        setMediaFiles((prev) => ({
          ...prev,
          [mediaType]: [...prev[mediaType], file],
        }));

        // Generate thumbnail if it's a video
        if (mediaType === "videos") {
          const videoIndex = mediaFiles.videos.length;
          const videoUrl = URL.createObjectURL(file);

          import("../utils/uiHelpers").then(({ generateVideoThumbnail }) => {
            generateVideoThumbnail(videoUrl)
              .then((thumbnailUrl) => {
                setVideoThumbnails((prev) => {
                  const newThumbnails = [...prev];
                  newThumbnails[videoIndex] = thumbnailUrl;
                  return newThumbnails;
                });
              })
              .catch((error) => {
                console.error("Error generating thumbnail:", error);
              })
              .finally(() => {
                // Clean up the object URL when done
                URL.revokeObjectURL(videoUrl);
              });
          });
        }
      }
    } else {
      // Handle other form inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Remove a media file from the list
  const removeMediaFile = (mediaType, index) => {
    setMediaFiles((prev) => {
      const updatedFiles = [...prev[mediaType]];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [mediaType]: updatedFiles,
      };
    });

    // Also remove thumbnail if it's a video
    if (mediaType === "videos") {
      setVideoThumbnails((prev) => {
        const updatedThumbnails = [...prev];
        updatedThumbnails.splice(index, 1);
        return updatedThumbnails;
      });
    }
  };

  return (
    <div className="add-program-container">
      {formTitle && <h1 className="add-program-title">{formTitle}</h1>}

      {submitSuccess && (
        <Alert variant="success" className="mb-3">
          Program submitted successfully! Redirecting...
        </Alert>
      )}

      {submitError && (
        <Alert variant="danger" className="mb-3">
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="add-program-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug (URL-friendly name)</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              readOnly={editing}
              disabled={editing}
              className="input"
              placeholder="Leave blank to generate from title"
            />
            <div className="help-text">
              This will be used in the URL. If left blank, it will be generated
              from the title.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input textarea"
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="input select"
              >
                <option value="app">App</option>
                <option value="game">Game</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="input select"
              >
                <option value="">Select a category</option>
                {categories
                  .filter((category) => category.related_type === formData.type)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="release_date">Release Date</label>
              <input
                type="date"
                id="release_date"
                name="release_date"
                value={formData.release_date}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="download_url">Download URL</label>
            <input
              type="url"
              id="download_url"
              name="download_url"
              value={formData.download_url}
              onChange={handleChange}
              required
              className="input"
              placeholder="https://"
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
              />
              Publish this program
            </label>
          </div>
        </div>

        {/* Icon Section */}
        <div className="form-section">
          <h3>Icon</h3>
          <div className="file-upload">
            <label htmlFor="icon">
              Upload Icon (Square image, 512x512 recommended)
            </label>
            <input
              type="file"
              id="icon"
              name="icon"
              onChange={handleChange}
              accept="image/*"
              className="file-input"
            />
            {formData.icon && (
              <div className="mt-2">
                <img
                  src={formData.icon}
                  alt="Icon Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Media Section */}
        <div className="form-section">
          <h3>Media</h3>

          {/* Screenshots */}
          <div className="media-section">
            <h4>Screenshots</h4>
            <div className="media-upload">
              <input
                type="file"
                name="media_screenshots"
                onChange={handleChange}
                className="file-input"
                accept="image/*"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="upload-button">
                <FaPlus /> Add Screenshot
              </label>
            </div>

            {/* Existing Screenshots */}
            {existingMedia.screenshots.length > 0 && (
              <div className="mb-3">
                <p>Current Screenshots:</p>
                <div className="media-preview">
                  {existingMedia.screenshots.map((screenshot, index) => (
                    <div
                      key={`existing-screenshot-${index}`}
                      className="media-item"
                    >
                      <div className="screenshot-container">
                        <img
                          src={screenshot.file}
                          alt={`Screenshot ${index + 1}`}
                          className="media-thumbnail screenshot-thumbnail"
                        />
                        <div className="media-name">Screenshot {index + 1}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeExistingMedia("screenshots", index)
                        }
                        className="remove-media"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Screenshots */}
            {mediaFiles.screenshots.length > 0 && (
              <div className="media-preview">
                {mediaFiles.screenshots.map((file, index) => (
                  <div key={`screenshot-${index}`} className="media-item">
                    <div className="screenshot-container">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Screenshot ${index + 1}`}
                        className="media-thumbnail screenshot-thumbnail"
                      />
                      <div className="media-name">{file.name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMediaFile("screenshots", index)}
                      className="remove-media"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos */}
          <div className="media-section">
            <h4>Videos</h4>
            <div className="media-upload">
              <input
                type="file"
                name="media_videos"
                onChange={handleChange}
                className="file-input"
                accept="video/*"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="upload-button">
                <FaPlus /> Add Video
              </label>
            </div>

            {/* Existing Videos */}
            {existingMedia.videos.length > 0 && (
              <div className="mb-3">
                <p>Current Videos:</p>
                <div className="media-preview">
                  {existingMedia.videos.map((video, index) => (
                    <div key={`existing-video-${index}`} className="media-item">
                      {videoThumbnails[index] ? (
                        <div className="video-thumbnail-container">
                          <img
                            src={videoThumbnails[index]}
                            alt={`Video ${index + 1}`}
                            className="media-thumbnail video-thumbnail"
                          />
                          <div className="media-name">Video {index + 1}</div>
                        </div>
                      ) : (
                        <div className="video-placeholder">
                          <div className="loading-thumbnail">
                            Loading preview...
                          </div>
                          <div className="video-name">Video {index + 1}</div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingMedia("videos", index)}
                        className="remove-media"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Videos */}
            {mediaFiles.videos.length > 0 && (
              <div className="media-preview">
                {mediaFiles.videos.map((file, index) => (
                  <div key={`video-${index}`} className="media-item">
                    {videoThumbnails[existingMedia.videos.length + index] ? (
                      <div className="video-thumbnail-container">
                        <img
                          src={
                            videoThumbnails[existingMedia.videos.length + index]
                          }
                          alt={`Video ${index + 1}`}
                          className="media-thumbnail video-thumbnail"
                        />
                        <div className="video-name">{file.name}</div>
                      </div>
                    ) : (
                      <div className="video-placeholder">
                        <div className="loading-thumbnail">
                          Generating preview...
                        </div>
                        <div className="video-name">{file.name}</div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeMediaFile("videos", index)}
                      className="remove-media"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Banners */}
          <div className="media-section">
            <h4>Banners</h4>
            <div className="media-upload">
              <input
                type="file"
                name="media_banners"
                onChange={handleChange}
                className="file-input"
                accept="image/*"
                id="banner-upload"
              />
              <label htmlFor="banner-upload" className="upload-button">
                <FaPlus /> Add Banner
              </label>
            </div>

            {/* Existing Banners */}
            {existingMedia.banners.length > 0 && (
              <div className="mb-3">
                <p>Current Banners:</p>
                <div className="media-preview">
                  {existingMedia.banners.map((banner, index) => (
                    <div
                      key={`existing-banner-${index}`}
                      className="media-item banner"
                    >
                      <div className="banner-container">
                        <img
                          src={banner.file}
                          alt={`Banner ${index + 1}`}
                          className="media-thumbnail banner-thumbnail"
                        />
                        <div className="media-name">Banner {index + 1}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExistingMedia("banners", index)}
                        className="remove-media"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Banners */}
            {mediaFiles.banners.length > 0 && (
              <div className="media-preview">
                {mediaFiles.banners.map((file, index) => (
                  <div key={`banner-${index}`} className="media-item banner">
                    <div className="banner-container">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Banner ${index + 1}`}
                        className="media-thumbnail banner-thumbnail"
                      />
                      <div className="media-name">{file.name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMediaFile("banners", index)}
                      className="remove-media"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={submitLoading}
        >
          {submitLoading ? "Submitting..." : submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default ProgramForm;
