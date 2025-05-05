import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@tanstack/react-store';
import { programStore, fetchProgramDetails, updateProgram, categoryStore, fetchCategories } from '../store';
import { Spinner, Alert } from 'react-bootstrap';
import ProgramForm from '../components/ProgramForm';
import { generateVideoThumbnail } from '../utils/uiHelpers';

const EditProgram = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const categories = useStore(categoryStore, state => state.categories);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'app',
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
  
  // State for existing media
  const [existingMedia, setExistingMedia] = useState({
    screenshots: [],
    videos: [],
    banners: []
  });
  
  // State for media to delete
  const [mediaToDelete, setMediaToDelete] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Get program data from store
  const program = useStore(programStore, state => state.currentProgram);
  const programLoading = useStore(programStore, state => state.loading);
  
  // Fetch program details and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch program details
        await fetchProgramDetails(slug);
        
      } catch (err) {
        console.error('Error loading program data:', err);
        setError('Failed to load program data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [slug]);
  
  // Fetch categories when program type changes
  useEffect(() => {
    if (formData.type) {
      fetchCategories(formData.type);
    }
  }, [formData.type]);
  
  // Populate form data when program is loaded
  useEffect(() => {
    if (program && program.id) {
      const type = program.type || 'app';
      
      // Fetch categories for this program type
      fetchCategories(type);
      
      // Set form data from program
      setFormData({
        title: program.title || '',
        slug: program.slug || '',
        description: program.description || '',
        type: type,
        category_id: program.category?.id || '',
        release_date: program.release_date ? new Date(program.release_date).toISOString().split('T')[0] : '',
        price: program.price?.toString() || '0.00',
        download_url: program.download_url || '',
        is_published: program.is_published || false,
      });
      
      // Set existing media
      if (program.media && program.media.length > 0) {
        const screenshots = program.media.filter(m => m.media_type === 'screenshot');
        const videos = program.media.filter(m => m.media_type === 'video');
        const banners = program.media.filter(m => m.media_type === 'banner');
        
        setExistingMedia({
          screenshots,
          videos,
          banners
        });
        
        // Generate thumbnails for existing videos
        videos.forEach((video, index) => {
          generateVideoThumbnail(video.file)
            .then(thumbnailUrl => {
              setVideoThumbnails(prev => {
                const newThumbnails = [...prev];
                newThumbnails[index] = thumbnailUrl;
                return newThumbnails;
              });
            })
            .catch(error => {
              console.error('Error generating thumbnail:', error);
            });
        });
      }
    }
  }, [program]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (name === 'icon') {
        // Handle icon file
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      } else if (name.startsWith('media_')) {
        // Handle media files
        const mediaType = name.replace('media_', '');
        const newFiles = [...mediaFiles[mediaType], ...Array.from(files)];
        setMediaFiles(prev => ({
          ...prev,
          [mediaType]: newFiles
        }));
        
        // Generate thumbnails for videos
        if (mediaType === 'videos') {
          Array.from(files).forEach(file => {
            const videoUrl = URL.createObjectURL(file);
            generateVideoThumbnail(videoUrl)
              .then(thumbnailUrl => {
                setVideoThumbnails(prev => [
                  ...prev, 
                  thumbnailUrl
                ]);
              })
              .catch(err => {
                console.error('Error generating thumbnail:', err);
              });
          });
        }
      }
    } else if (type === 'checkbox') {
      // Handle checkbox
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      // Handle other inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Auto-generate slug from title
      if (name === 'title' && formData.slug === '') {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        setFormData(prev => ({
          ...prev,
          slug
        }));
      }
    }
  };
  
  // Remove a media file
  const removeMediaFile = (mediaType, index) => {
    setMediaFiles(prev => {
      const updatedFiles = [...prev[mediaType]];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [mediaType]: updatedFiles
      };
    });
    
    // Also remove thumbnail if it's a video
    if (mediaType === 'videos') {
      setVideoThumbnails(prev => {
        const updatedThumbnails = [...prev];
        updatedThumbnails.splice(existingMedia.videos.length + index, 1);
        return updatedThumbnails;
      });
    }
  };
  
  // Remove an existing media item
  const removeExistingMedia = (mediaType, index) => {
    const mediaItem = existingMedia[mediaType][index];
    
    // Add to media to delete list
    if (mediaItem && mediaItem.id) {
      setMediaToDelete(prev => [...prev, mediaItem.id]);
    }
    
    // Remove from existing media list
    setExistingMedia(prev => {
      const updatedMedia = [...prev[mediaType]];
      updatedMedia.splice(index, 1);
      return {
        ...prev,
        [mediaType]: updatedMedia
      };
    });
    
    // Also remove thumbnail if it's a video
    if (mediaType === 'videos') {
      setVideoThumbnails(prev => {
        const updatedThumbnails = [...prev];
        updatedThumbnails.splice(index, 1);
        return updatedThumbnails;
      });
    }
  };
  
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
      
      // Update the program - pass mediaFiles and mediaToDelete separately
      await updateProgram(slug, formDataObj, mediaFiles, mediaToDelete);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Redirect to published programs page after a delay
      setTimeout(() => {
        navigate('/profile/published-programs');
      }, 2000);
      
    } catch (err) {
      console.error('Error updating program:', err);
      setSubmitError('Failed to update program. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Show loading state
  if (loading || programLoading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }
  
  return (
    <ProgramForm
      formTitle="Edit Program"
      formData={formData}
      setFormData={setFormData}
      mediaFiles={mediaFiles}
      setMediaFiles={setMediaFiles}
      videoThumbnails={videoThumbnails}
      setVideoThumbnails={setVideoThumbnails}
      existingMedia={existingMedia}
      removeExistingMedia={removeExistingMedia}
      categories={categories}
      handleSubmit={handleSubmit}
      submitLoading={submitLoading}
      submitError={submitError}
      submitSuccess={submitSuccess}
      submitButtonText="Update Program"
    />
  );
};

export default EditProgram;
