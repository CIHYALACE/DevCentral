import React, { useState, useEffect } from 'react';
import '../style/AddProgram.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';

const AddProgram = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'app', // Default value from TYPE_CHOICES
    category_id: '',
    release_date: '',
    price: '0.00',
    download_url: '',
    is_published: false,
    icon: null,
  });
  
  // State for media files
  const [mediaFiles, setMediaFiles] = useState({
    screenshots: [],
    videos: [],
    banners: []
  });
  
  // Fetch categories based on selected type
  useEffect(() => {
    if (formData.type) {
      axios.get(`http://127.0.0.1:8000/categories/?related_type=${formData.type}`)
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [formData.type]);
  
  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file' && name === 'icon') {
      setFormData({ ...formData, icon: files[0] });
    } else if (type === 'file' && name.startsWith('media_')) {
      // Handle media file uploads (screenshots, videos, banners)
      const mediaType = name.split('_')[1]; // Extract media type from name
      if (files.length > 0) {
        setMediaFiles(prev => ({
          ...prev,
          [mediaType]: [...prev[mediaType], files[0]]
        }));
      }
    } else {
      // If title is being updated, also update the slug
      if (name === 'title') {
        setFormData({ 
          ...formData, 
          [name]: value,
          slug: generateSlug(value)
        });
      } else if (name === 'type') {
        // When type changes, reset category_id
        setFormData({ 
          ...formData, 
          [name]: value,
          category_id: ''
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  
  // Remove a media file from the list
  const removeMediaFile = (mediaType, index) => {
    setMediaFiles(prev => {
      const updatedFiles = [...prev[mediaType]];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [mediaType]: updatedFiles
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Add all form data to FormData object
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    // Send the data to the API to create the program
    axios.post('http://127.0.0.1:8000/programs/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Program added successfully:', response.data);
        const programId = response.data.id;
        const programSlug = response.data.slug;
        
        // Upload media files if any exist
        const mediaUploads = [];
        
        // Process screenshots
        mediaFiles.screenshots.forEach(file => {
          const mediaData = new FormData();
          mediaData.append('program', programId);
          mediaData.append('media_type', 'screenshot');
          mediaData.append('file', file);
          
          mediaUploads.push(
            axios.post('http://127.0.0.1:8000/media/', mediaData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
          );
        });
        
        // Process videos
        mediaFiles.videos.forEach(file => {
          const mediaData = new FormData();
          mediaData.append('program', programId);
          mediaData.append('media_type', 'video');
          mediaData.append('file', file);
          
          mediaUploads.push(
            axios.post('http://127.0.0.1:8000/media/', mediaData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
          );
        });
        
        // Process banners
        mediaFiles.banners.forEach(file => {
          const mediaData = new FormData();
          mediaData.append('program', programId);
          mediaData.append('media_type', 'banner');
          mediaData.append('file', file);
          
          mediaUploads.push(
            axios.post('http://127.0.0.1:8000/media/', mediaData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
          );
        });
        
        // Wait for all media uploads to complete
        if (mediaUploads.length > 0) {
          Promise.all(mediaUploads)
            .then(() => {
              console.log('All media files uploaded successfully');
              navigate('/admin/programs');
            })
            .catch(error => {
              console.error('Error uploading media files:', error);
              alert('Program was created but there was an error uploading some media files. You can add them later.');
              navigate('/admin/programs');
            });
        } else {
          // No media files to upload, just navigate
          navigate('/admin/programs');
        }
      })
      .catch((error) => {
        console.error('Error adding program:', error);
        if (error.response && error.response.data) {
          // Display specific error messages from the API if available
          alert(`Error adding program: ${JSON.stringify(error.response.data)}`);
        } else {
          // Generic error message
          alert('Error adding program. Please check the form and try again.');
        }
      });
  };

  return (
    <div className="add-program-container">
      <h2 className="add-program-title">🧩 Add New Program</h2>
      <form onSubmit={handleSubmit} className="add-program-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Program Title" 
            className="input" 
            required 
          />
          
          <input 
            name="slug" 
            value={formData.slug} 
            onChange={handleChange} 
            placeholder="Slug (auto-generated from title)" 
            className="input" 
            required 
          />
          
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Description" 
            className="input textarea" 
            required 
          />
          
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            className="input select" 
            required
          >
            <option value="">Select Type</option>
            <option value="app">App</option>
            <option value="game">Game</option>
            <option value="book">Book</option>
          </select>
        </div>
        
        {/* Category Selection */}
        <div className="form-section">
          <h3>Category</h3>
          <select 
            name="category_id" 
            value={formData.category_id} 
            onChange={handleChange} 
            className="input select" 
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="help-text">Select a type first to see available categories</p>
          )}
        </div>
        
        {/* Release Date and Pricing */}
        <div className="form-section">
          <h3>Release Date and Pricing</h3>
          <div className="form-group">
            <label>Release Date:</label>
            <input 
              type="date" 
              name="release_date" 
              value={formData.release_date} 
              onChange={handleChange} 
              className="input" 
            />
            <p className="help-text">Leave empty to use today's date</p>
          </div>
          
          <div className="form-group">
            <label>Price ($):</label>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="0.00" 
              className="input" 
              required 
            />
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="form-section">
          <h3>Additional Details</h3>
          <input 
            name="download_url" 
            value={formData.download_url} 
            onChange={handleChange} 
            placeholder="Download URL" 
            className="input" 
            required 
          />
          
          <div className="form-group file-upload">
            <label>Program Icon:</label>
            <input 
              type="file" 
              name="icon" 
              onChange={handleChange} 
              className="file-input" 
              accept="image/*" 
              required 
            />
          </div>
          
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              name="is_published" 
              checked={formData.is_published} 
              onChange={handleChange} 
            />
            <span>Publish Program</span>
          </label>
        </div>
        
        {/* Media Files */}
        <div className="form-section">
          <h3>Media Files</h3>
          
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
            
            {mediaFiles.screenshots.length > 0 && (
              <div className="media-preview">
                {mediaFiles.screenshots.map((file, index) => (
                  <div key={`screenshot-${index}`} className="media-item">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Screenshot ${index + 1}`} 
                      className="media-thumbnail" 
                    />
                    <button 
                      type="button" 
                      onClick={() => removeMediaFile('screenshots', index)}
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
            
            {mediaFiles.videos.length > 0 && (
              <div className="media-preview">
                {mediaFiles.videos.map((file, index) => (
                  <div key={`video-${index}`} className="media-item">
                    <div className="video-placeholder">
                      Video: {file.name}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeMediaFile('videos', index)}
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
            
            {mediaFiles.banners.length > 0 && (
              <div className="media-preview">
                {mediaFiles.banners.map((file, index) => (
                  <div key={`banner-${index}`} className="media-item">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Banner ${index + 1}`} 
                      className="media-thumbnail banner-thumbnail" 
                    />
                    <button 
                      type="button" 
                      onClick={() => removeMediaFile('banners', index)}
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

        <button type="submit" className="submit-button">🚀 Submit Program</button>
      </form>
    </div>
  );
};

export default AddProgram;
