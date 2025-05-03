import axios from 'axios';
import { API_URL } from './index';

// Function to download the book PDF
export const downloadBookPdf = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/api/books/${bookId}/download/`, {
      responseType: 'blob', // Ensure the response is treated as a file
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `book_${bookId}.pdf`); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Failed to download PDF:', error);
    throw error;
  }
};

// Function to add the book to the wishlist
export const addToWishlist = async (bookId) => {
  try {
    const response = await axios.post(`${API_URL}/api/wishlist/`, { book_id: bookId });
    return response.data;
  } catch (error) {
    console.error('Failed to add to wishlist:', error);
    throw error;
  }
};