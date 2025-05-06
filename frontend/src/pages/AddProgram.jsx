import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@tanstack/react-store';
import ProgramForm from '../components/ProgramForm';
import { categoryStore, fetchCategories, programStore, addProgram } from '../store';

const AddProgram = () => {
  const navigate = useNavigate();
  const categories = useStore(categoryStore, state => state.categories);
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
  
  // State for video thumbnails
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  
  // State for form submission
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Fetch categories when type changes
  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories(formData.type);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    loadCategories();
  }, [formData.type]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      // Create FormData object for form fields
      const formDataObj = new FormData();
      
      // Add form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'icon' || (key === 'icon' && formData[key] !== null)) {
          formDataObj.append(key, formData[key]);
        }
      });
      
      // Send the request using the addProgram function from the store
      // Pass mediaFiles separately to handle them correctly
      const response = await addProgram(formDataObj, mediaFiles);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Redirect to the program details page after a delay
      setTimeout(() => {
        navigate(`/details/${response.type}/${response.slug}`);
      }, 2000);
      
    } catch (err) {
      console.error('Error creating program:', err);
      setSubmitError('Failed to create program. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  return (
    <ProgramForm
      formTitle="Add New Program"
      formData={formData}
      setFormData={setFormData}
      mediaFiles={mediaFiles}
      setMediaFiles={setMediaFiles}
      videoThumbnails={videoThumbnails}
      setVideoThumbnails={setVideoThumbnails}
      categories={categories}
      handleSubmit={handleSubmit}
      submitLoading={submitLoading}
      submitError={submitError}
      submitSuccess={submitSuccess}
      submitButtonText="Add Program"
    />
  );
};

export default AddProgram;
