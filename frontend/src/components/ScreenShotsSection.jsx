import React, { useState, useEffect } from 'react';
import { Container, Carousel, Modal } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { generateVideoThumbnail } from '../utils/uiHelpers';
import './ScreenShotsSection.css';

export function ScreenShotsSection({media}) {
  const [showModal, setShowModal] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [mediaWithThumbnails, setMediaWithThumbnails] = useState([]);
  
  // Generate thumbnails for videos when media changes
  useEffect(() => {
    const processMedia = async () => {
      // Create a copy of the media array to work with
      const processedMedia = [...media];
      
      // Filter videos that don't have thumbnails
      const videos = processedMedia.filter(item => item.media_type === 'video');
      
      // Generate thumbnails for each video
      for (const video of videos) {
        try {
          // Generate thumbnail for the video
          const thumbnailUrl = await generateVideoThumbnail(video.file);
          // Find the video in the processed media and add the thumbnail
          const index = processedMedia.findIndex(item => item.id === video.id);
          if (index !== -1) {
            processedMedia[index] = { ...processedMedia[index], thumbnail: thumbnailUrl };
          }
        } catch (error) {
          console.error(`Failed to generate thumbnail for video ${video.id}:`, error);
        }
      }
      
      setMediaWithThumbnails(processedMedia);
    };
    
    processMedia();
  }, [media]);
  
  // Filter media by type
  const screenshots = mediaWithThumbnails.filter(item => item.media_type === 'screenshot');
  const videos = mediaWithThumbnails.filter(item => item.media_type === 'video');
  
  // Combine screenshots and videos for display, but put screenshots first
  const displayMedia = [...screenshots, ...videos];
  
  const handleMediaClick = (item) => {
    setCurrentMedia(item);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentMedia(null);
  };
  
  return (
    <Container className="mt-5">
      <div className="bg-white rounded-4 border shadow-sm p-4">
        <h3>Media Gallery</h3>
        <hr />
        
        {displayMedia.length > 0 ? (
          <>
            <Carousel fade indicators interval={3000} className="media-carousel" style={{ height: '400px' }}>
              {displayMedia.map((item) => (
                <Carousel.Item key={item.id}>
                  <div 
                    className={`media-preview-container rounded ${item.media_type === 'video' ? 'video-preview' : 'image-preview'}`}
                    onClick={() => handleMediaClick(item)}
                    style={{ 
                      position: 'relative',
                      cursor: 'pointer',
                      height: '400px',
                      width: '100%',
                      backgroundColor: item.media_type === 'video' ? '#000' : '#f8f9fa',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {item.media_type === 'video' ? (
                      <>
                        {item.thumbnail ? (
                          <img
                            className="d-block w-100 rounded"
                            src={item.thumbnail}
                            alt="Video preview"
                            style={{ 
                              objectFit: 'cover', 
                              height: '400px',
                              width: '100%',
                              opacity: '0.7'
                            }}
                          />
                        ) : (
                          <div className="generating-thumbnail" style={{
                            color: 'white',
                            textAlign: 'center'
                          }}>
                            <div className="spinner-border text-light mb-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Generating preview...</p>
                          </div>
                        )}
                        <div className="play-button-overlay" style={{
                          position: 'absolute',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white'
                        }}>
                          <FaPlay size={30} />
                        </div>
                      </>
                    ) : (
                      <img
                        className="d-block rounded hover-zoom"
                        src={item.file}
                        alt={`app ${item.media_type}`}
                        style={{ 
                          objectFit: 'contain',
                          height: '400px',
                          width: '100%',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    )}
                    <div className="media-overlay" />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            
            {/* Media Modal */}
            <Modal
              show={showModal}
              onHide={closeModal}
              size="lg"
              centered
              dialogClassName={currentMedia?.media_type === 'video' ? 'video-modal' : 'image-modal'}
            >
              <Modal.Header closeButton>
                <Modal.Title>{currentMedia?.media_type === 'video' ? 'Video' : 'Image'}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0">
                {currentMedia?.media_type === 'video' ? (
                  <video 
                    controls 
                    autoPlay 
                    className="w-100"
                    src={currentMedia?.file}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="image-modal-container">
                    <img 
                      src={currentMedia?.file} 
                      alt="Screenshot" 
                      className="img-fluid"
                      style={{
                        maxHeight: '80vh',
                        maxWidth: '100%',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                  </div>
                )}
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No media available</p>
          </div>
        )}
      </div>
    </Container>
  );
}
