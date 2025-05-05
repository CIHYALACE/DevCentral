// Date formatting
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Price formatting
const formatPrice = (price) => {
  if (price === 0 || price === '0' || price === '0.00') return 'Free';
  return `$${parseFloat(price).toFixed(2)}`;
};

// Rating formatting
const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

// File size formatting
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Truncate text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Generate avatar placeholder
const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Generate random color based on string
const stringToColor = (string) => {
  if (!string) return '#000000';
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Generate avatar with initials and background color
const generateAvatar = (name) => {
  return {
    initials: getInitials(name),
    backgroundColor: stringToColor(name)
  };
};

// Format error messages from API responses
const formatErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';
  
  if (typeof error === 'string') return error;
  
  if (error.detail) return error.detail;
  
  if (error.message) return error.message;
  
  if (typeof error === 'object') {
    // Handle Django REST framework validation errors
    const messages = [];
    for (const key in error) {
      if (Array.isArray(error[key])) {
        messages.push(`${key}: ${error[key].join(', ')}`);
      } else {
        messages.push(`${key}: ${error[key]}`);
      }
    }
    if (messages.length > 0) {
      return messages.join('. ');
    }
  }
  
  return 'An unknown error occurred';
};

// Debounce function for search inputs
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate a thumbnail from a video URL
const generateVideoThumbnail = (videoUrl) => {
  return new Promise((resolve, reject) => {
    // Create a video element
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous'; // To avoid CORS issues when possible
    
    // Set up event handlers
    video.onloadedmetadata = () => {
      // Seek to 1 second or 25% of the video, whichever is less
      const seekTime = Math.min(1, video.duration * 0.25);
      video.currentTime = seekTime;
    };
    
    video.onseeked = () => {
      try {
        // Create a canvas to capture the frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        
        // Draw the video frame to the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get the data URL from the canvas
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        
        // Clean up
        URL.revokeObjectURL(video.src);
        
        // Resolve with the thumbnail URL
        resolve(thumbnailUrl);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
        reject(error);
      }
    };
    
    // Handle errors
    video.onerror = (error) => {
      console.error('Error loading video:', error);
      URL.revokeObjectURL(video.src);
      reject(error);
    };
    
    // Set the video source and start loading
    video.src = videoUrl;
    video.load();
  });
};

export {
  formatDate,
  formatDateTime,
  formatPrice,
  formatRating,
  formatFileSize,
  truncateText,
  getInitials,
  stringToColor,
  generateAvatar,
  formatErrorMessage,
  debounce,
  generateVideoThumbnail
};
