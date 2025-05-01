export const API_URL = "http://127.0.0.1:8000";

// Auth Store
export { authStore, login, logout, refresh } from "./authStore.js";

// Program Stores
export { appStore, fetchApps } from "./appStore.js";
export { gameStore, fetchGames, fetchGameDetails } from "./gameStore.js";
export { 
  programStore, 
  fetchPrograms, 
  fetchProgramDetails, 
  fetchTopCharts, 
  fetchProductivityApps,
  getProgramsByCategory,
  getProgramsByType
} from "./programStore.js";

// Category Store
export { 
  categoryStore, 
  fetchCategories, 
  getCategoryByType 
} from "./categoryStore.js";

// Review Store
export { 
  reviewStore, 
  fetchReviews, 
  fetchProgramReviews, 
  submitReview 
} from "./reviewStore.js";

// Profile Store
export { 
  profileStore, 
  fetchUserProfile, 
  fetchCurrentUserProfile, 
  updateUserProfile,
  fetchUserApps
} from "./profileStore.js";

// Download Store
export { 
  downloadStore, 
  fetchDownloads, 
  fetchUserDownloads, 
  recordDownload 
} from "./downloadStore.js";

// Flag Store
export { 
  flagStore, 
  fetchFlags, 
  fetchUserFlags, 
  submitFlag 
} from "./flagStore.js";

// Book Store
export { 
  bookStore, 
  fetchBooks, 
  fetchBookDetails, 
  fetchSimilarBooks,
  fetchAuthorBooks 
} from "./bookStore.js";
