import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import "../style/ItemDetails.css";
import SimilarAppsSection from '../components/SimilarAppsSection';
import { ScreenShotsSection } from '../components/ScreenShotsSection';
import { DescriptionSection } from '../components/DescriptionSection';
import { RatingSection } from '../components/RatingSection';
import { Feature } from '../components/Feature';
import { Container, Modal } from 'react-bootstrap';
import "../style/HeroGameDetails.css";
import { useStore } from '@tanstack/react-store';
import { programStore } from '../store';
import { authStore } from '../store/authStore';
import { fetchProgramDetails, recordDownload } from '../store/programStore';
import { generateVideoThumbnail } from '../utils/uiHelpers';
import { FaPlay } from 'react-icons/fa';

// Function to format download count (e.g., 1000 -> 1K, 1000000 -> 1M)
const formatDownloadCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`;
  } else {
    return count.toString();
  }
};

const ItemDetails = () => {
  const { type, slug } = useParams();
  const appDetails = useStore(programStore, (state) => state.currentProgram);
  const { isAuthenticated } = useStore(authStore);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideshow, setSlideshow] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const slideshowIntervalRef = useRef(null);
  const [processedMedia, setProcessedMedia] = useState([]);
  
  useEffect(() => {
    fetchProgramDetails(slug);
  }, [type, slug]);
  
  // Process media and generate thumbnails for videos
  useEffect(() => {
    const processMedia = async () => {
      if (!appDetails || !appDetails.media) return;
      
      // Create a copy of the media array to work with
      const mediaWithThumbnails = [...appDetails.media];
      
      // Filter videos that don't have thumbnails
      const videos = mediaWithThumbnails.filter(item => item.media_type === 'video');
      
      // Generate thumbnails for each video
      for (const video of videos) {
        try {
          // Generate thumbnail for the video
          const thumbnailUrl = await generateVideoThumbnail(video.file);
          // Find the video in the processed media and add the thumbnail
          const index = mediaWithThumbnails.findIndex(item => item.id === video.id);
          if (index !== -1) {
            mediaWithThumbnails[index] = { ...mediaWithThumbnails[index], thumbnail: thumbnailUrl };
          }
        } catch (error) {
          console.error(`Failed to generate thumbnail for video ${video.id}:`, error);
        }
      }
      
      setProcessedMedia(mediaWithThumbnails);
    };
    
    processMedia();
  }, [appDetails]);
  
  // Prepare slideshow media when processed media changes
  useEffect(() => {
    if (processedMedia.length > 0) {
      // Organize media with exclusive priority: banners > screenshots > videos > app icon
      let slideshowMedia = [];
      
      // Check for banners first
      const banners = processedMedia.filter(media => media.media_type === 'banner');
      if (banners.length > 0) {
        slideshowMedia = banners;
      } else {
        // If no banners, check for screenshots
        const screenshots = processedMedia.filter(media => media.media_type === 'screenshot');
        if (screenshots.length > 0) {
          slideshowMedia = screenshots;
        } else {
          // If no screenshots, check for videos
          const videos = processedMedia.filter(media => media.media_type === 'video');
          if (videos.length > 0) {
            slideshowMedia = videos;
          } else if (appDetails?.icon) {
            // Last resort: use app icon
            slideshowMedia = [{ file: appDetails.icon, media_type: 'icon' }];
          }
        }
      }
      
      setSlideshow(slideshowMedia);
      setCurrentSlideIndex(0); // Reset to first slide when app changes
    }
  }, [processedMedia, appDetails]);
  
  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (slideshow.length <= 1) return; // Don't set up interval if only one or no slides
    
    const interval = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slideshow.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slideshow.length]);
  
  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);
    
    try {
      // Record the download in the backend
      await recordDownload(appDetails.id);
      
      // After recording, proceed with the actual download
      window.open(appDetails.download_url, '_blank');
    } catch (error) {
      console.error('Failed to record download:', error);
      // Still allow the download even if recording fails
      window.open(appDetails.download_url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!appDetails || appDetails.slug != slug) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='bg-light'>
      <div className="imgContainer">
        {slideshow.length > 0 ? (
          <>
            <img
              className="d-block w-100"
              src={slideshow[currentSlideIndex].file}
              alt={`${appDetails.title} - ${slideshow[currentSlideIndex].media_type}`}
              style={{ height: '600px', objectFit: 'cover' }}
            />
            {/* Slideshow indicators */}
            {slideshow.length > 1 && (
              <div className="slideshow-indicators">
                {slideshow.map((_, index) => (
                  <span 
                    key={index} 
                    className={`indicator ${index === currentSlideIndex ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(index)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="placeholder-banner" style={{ height: '600px', backgroundColor: '#f0f0f0' }}>
            <div className="text-center pt-5">
              <i className="fa-solid fa-image fa-4x text-muted"></i>
              <p className="mt-3 text-muted">No media available</p>
            </div>
          </div>
        )}
        <div className="overlay"></div>
      </div>
      <div className='hero-text'>
        <div className=' d-flex  align-items-center'>
        {/* <img 
                src={iconImage} 
                alt={`${game.title} Logo`} 
                className="img-fluid border border-black rounded" 
                style={{ maxWidth: "60px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Genshin-Impact-Icon.webp'; // Fallback if icon fails to load
                }}
              /> */}
          <img src={appDetails?.icon} alt="imgLogo" className="img-fluid border border-black rounded object-fit-cover" style={{ width: '100px', height: '100px'}} />
          <h2 className='hero-caption mx-3'>{appDetails.title}</h2>
        </div>
        <p className='mt-5'>{appDetails.description}</p>
        <div className='d-flex align-items-center mt-4 text-info'>
          <p className='me-4'>{appDetails.rating}  <i className="fa-solid fa-star"></i> </p>
          <p>{appDetails.rating_count || 0} ratings</p>
          <p className='ms-4'>{formatDownloadCount(appDetails.download_count || 0)} <i className="fa-solid fa-download"></i></p>
        </div>
        <button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className='hero-btn btn btn-info w-50 mt-4'
        >
          {isDownloading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Recording download...
            </>
          ) : 'Download Now'}
        </button>
        <p className='mt-3 '>Offers in-app purchases</p>
      </div>


      <Container className="mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8 ">
            < ScreenShotsSection media={appDetails.media}/>
            <DescriptionSection description={appDetails.description} />
            <RatingSection programId={appDetails.id} />
            <Feature />
          </div>
          <div className="col-lg-4">
            <div className="bg-white rounded-4 border shadow-sm p-4 mt-5">
              <h3>You might also like:</h3>
              <hr />
              <SimilarAppsSection />
            </div>
          </div>
        </div>
      </Container>
    </div>
      );
};

      export default ItemDetails;
