import { Store } from "@tanstack/react-store";
import axios from "axios";
import { API_URL } from ".";

const programStore = new Store({
  programs: [],
  currentProgram: {},
  topCharts: [],
  productivityApps: [],
  loading: false,
  error: null,
  totalPrograms: 0,
  currentPage: 1
});

const fetchPrograms = async (page = 1, pageSize = 10, category = null, search = null, type = null, isTopChart = false, limit = null) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null, currentPage: page }));
  try {
    // Build query parameters
    let url = `${API_URL}/programs/?page=${page}&page_size=${pageSize}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (type) url += `&type=${type}`;
    if (isTopChart) url += `&top_chart=true`;
    if (limit) url += `&limit=${limit}`;
    
    // First get the total count
    const countResponse = await axios.get(`${API_URL}/programs/?count_only=true${type ? `&type=${type}` : ''}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`);
    const totalPrograms = countResponse.data.count || 0;
    
    // Then get the paginated data
    const response = await axios.get(url);
    
    // Handle both paginated and non-paginated responses
    const programs = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      programs,
      totalPrograms,
      loading: false
    }));
    return programs;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchProgramDetails = async (slug) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/${slug}/`);
    programStore.setState((state) => ({
      ...state,
      currentProgram: response.data,
      loading: false
    }));
    return response.data;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchTopCharts = async () => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/?top_chart=true&limit=10`);
    
    // Handle both paginated and non-paginated responses
    const topCharts = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      topCharts,
      loading: false
    }));
    return topCharts;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const fetchProductivityApps = async () => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.get(`${API_URL}/programs/?category=Productivity`);
    
    // Handle both paginated and non-paginated responses
    const productivityApps = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      productivityApps,
      loading: false
    }));
    return productivityApps;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const getProgramsByCategory = async (categoryName, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, categoryName);
};

const getProgramsByType = async (type, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, null, null, type);
};

const searchPrograms = async (searchTerm, page = 1, pageSize = 10) => {
  return await fetchPrograms(page, pageSize, null, searchTerm);
};

const fetchSimilarPrograms = async (categoryName, programType, currentProgramId, limit = 4) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // If no category name, just get programs of the same type
    if (!categoryName) {
      const programs = await fetchPrograms(1, limit, null, null, programType, false, limit);
      // Filter out the current program
      return programs.filter(program => program.id !== currentProgramId);
    }
    
    // Fetch programs with the same category name, sorted by download count
    // The backend expects category name, not ID
    const response = await axios.get(
      `${API_URL}/programs/?category=${categoryName}&type=${programType}&ordering=-download_count&limit=${limit + 1}`
    );
    
    // Extract the results and filter out the current program
    const programs = response.data.results ? response.data.results : response.data;
    const filtered = programs.filter(program => program.id !== currentProgramId);
    
    // Limit to specified number of programs
    return filtered.slice(0, limit);
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  } finally {
    programStore.setState((state) => ({
      ...state,
      loading: false
    }));
  }
};

const recordDownload = async (programId) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/downloads/`, {
      program_id: programId
    });
    
    // Update the current program's download count if it matches
    programStore.setState((state) => {
      const currentProgram = { ...state.currentProgram };
      
      // If this is the program being viewed, increment its download count
      if (currentProgram.id === programId) {
        currentProgram.download_count = (currentProgram.download_count || 0) + 1;
      }
      
      return {
        ...state,
        currentProgram,
        loading: false
      };
    });
    
    return response.data;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const submitReview = async (programId, score, comment) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.post(`${API_URL}/reviews/`, {
      program_id: programId,
      score,
      comment
    });
    
    // Update the current program's rating data if it matches
    programStore.setState((state) => {
      const currentProgram = { ...state.currentProgram };
      
      // If this is the program being viewed, update its rating data
      if (currentProgram.id === programId) {
        // Increment rating count
        currentProgram.rating_count = (currentProgram.rating_count || 0) + 1;
        
        // Recalculate average rating (simple approach)
        // For a more accurate approach, we would need to fetch the updated rating from the backend
        const totalRatingBefore = parseFloat(currentProgram.rating) * (currentProgram.rating_count - 1);
        const newTotalRating = totalRatingBefore + score;
        currentProgram.rating = (newTotalRating / currentProgram.rating_count).toFixed(2);
      }
      
      return {
        ...state,
        currentProgram,
        loading: false
      };
    });
    
    return response.data;
  } catch (error) {
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

/**
 * Fetch programs published by the current user
 */
const fetchPublishedPrograms = async (page = 1, pageSize = 10) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // Use the published action endpoint on the programs viewset
    const response = await axios.get(`${API_URL}/programs/published/`);
    
    // Handle both paginated and non-paginated responses
    const publishedPrograms = response.data.results ? response.data.results : response.data;
    
    programStore.setState((state) => ({
      ...state,
      programs: publishedPrograms,
      loading: false
    }));
    return publishedPrograms;
  } catch (error) {
    console.error('Error fetching published programs:', error.response?.data || error.message);
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    // Return empty array instead of throwing error for better UX
    return [];
  }
};

/**
 * Update an existing program
 */
const updateProgram = async (slug, programData, mediaFiles, mediaToDelete) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // Extract media files from the programData
    const formData = new FormData();
    
    // Add form fields to FormData
    for (const [key, value] of programData.entries()) {
      // Skip media files arrays, we'll handle them separately
      if (!key.endsWith('[]')) {
        formData.append(key, value);
      }
    }
    
    // Add media to delete if provided
    if (mediaToDelete && mediaToDelete.length > 0) {
      formData.append('media_to_delete', JSON.stringify(mediaToDelete));
    }
    
    // Make a PATCH request to update the program
    const response = await axios.patch(`${API_URL}/programs/${slug}/`, formData);
    
    // Upload new media files separately
    if (mediaFiles) {
      await uploadProgramMedia(response.data.id, mediaFiles);
    }
    
    // Update the current program in the store
    programStore.setState((state) => ({
      ...state,
      currentProgram: response.data,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error updating program:', error.response?.data || error.message);
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

/**
 * Upload media files for a program
 */
const uploadProgramMedia = async (programId, mediaFiles) => {
  const mediaUploads = [];
  
  // Process screenshots
  if (mediaFiles.screenshots && mediaFiles.screenshots.length > 0) {
    mediaFiles.screenshots.forEach(file => {
      const mediaData = new FormData();
      mediaData.append('program_id', programId);
      mediaData.append('media_type', 'screenshot');
      mediaData.append('file', file);
      
      mediaUploads.push(
        axios.post(`${API_URL}/media/`, mediaData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      );
    });
  }
  
  // Process videos
  if (mediaFiles.videos && mediaFiles.videos.length > 0) {
    mediaFiles.videos.forEach(file => {
      const mediaData = new FormData();
      mediaData.append('program_id', programId);
      mediaData.append('media_type', 'video');
      mediaData.append('file', file);
      
      mediaUploads.push(
        axios.post(`${API_URL}/media/`, mediaData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      );
    });
  }
  
  // Process banners
  if (mediaFiles.banners && mediaFiles.banners.length > 0) {
    mediaFiles.banners.forEach(file => {
      const mediaData = new FormData();
      mediaData.append('program_id', programId);
      mediaData.append('media_type', 'banner');
      mediaData.append('file', file);
      
      mediaUploads.push(
        axios.post(`${API_URL}/media/`, mediaData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      );
    });
  }
  
  if (mediaUploads.length > 0) {
    try {
      await Promise.all(mediaUploads);
      console.log('All media files uploaded successfully');
    } catch (error) {
      console.error('Error uploading media files:', error);
      throw error;
    }
  }
};

/**
 * Add a new program
 */
const addProgram = async (programData, mediaFiles) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    // Extract media files from the programData
    const formData = new FormData();
    
    // Add form fields to FormData
    for (const [key, value] of programData.entries()) {
      // Skip media files arrays, we'll handle them separately
      if (!key.endsWith('[]')) {
        formData.append(key, value);
      }
    }
    
    // Make a POST request to create the program
    const response = await axios.post(`${API_URL}/programs/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Upload media files separately
    await uploadProgramMedia(response.data.id, mediaFiles);
    
    // Update the current program in the store
    programStore.setState((state) => ({
      ...state,
      currentProgram: response.data,
      loading: false
    }));
    
    return response.data;
  } catch (error) {
    console.error('Error creating program:', error.response?.data || error.message);
    programStore.setState((state) => ({
      ...state,
      error,
      loading: false
    }));
    throw error;
  }
};

const deleteMedia = async (mediaId) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.delete(`${API_URL}/media/${mediaId}/`);
    programStore.setState((state) => ({ ...state, loading: false }));
    return response.data;
  } catch (error) {
    console.error('Error deleting media:', error.response?.data || error.message);
    programStore.setState((state) => ({ ...state, error, loading: false }));
    throw error;
  }
};

const deleteProgram = async (slug) => {
  programStore.setState((state) => ({ ...state, loading: true, error: null }));
  try {
    const response = await axios.delete(`${API_URL}/programs/${slug}/`);
    programStore.setState((state) => ({ ...state, loading: false }));
    return response.data;
  } catch (error) {
    console.error('Error deleting program:', error.response?.data || error.message);
    programStore.setState((state) => ({ ...state, error, loading: false }));
    throw error;
  }
};

export { 
  programStore, 
  fetchPrograms, 
  fetchProgramDetails, 
  fetchTopCharts, 
  fetchProductivityApps,
  addProgram,
  uploadProgramMedia,
  getProgramsByCategory,
  getProgramsByType,
  searchPrograms,
  fetchSimilarPrograms,
  recordDownload,
  submitReview,
  fetchPublishedPrograms,
  updateProgram,
  deleteMedia,
  deleteProgram
};
