import React from 'react';
import { Pagination } from 'react-bootstrap';

/**
 * Reusable pagination component for the application
 * @param {Object} props Component props
 * @param {number} props.currentPage Current active page
 * @param {number} props.totalItems Total number of items
 * @param {number} props.itemsPerPage Number of items per page
 * @param {Function} props.onPageChange Function to call when page changes
 * @param {number} props.maxPageButtons Maximum number of page buttons to show (default: 5)
 */
export function Paginator({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  maxPageButtons = 5 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Don't render if there's only one page or no items
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  // Calculate which page buttons to show
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  // Adjust if we're near the end
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  // Generate array of page numbers to display
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        {/* First page button */}
        {startPage > 1 && (
          <Pagination.First 
            onClick={() => onPageChange(1)} 
            disabled={currentPage === 1}
          />
        )}
        
        {/* Previous button */}
        <Pagination.Prev 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        />
        
        {/* Page number buttons */}
        {pages.map(page => (
          <Pagination.Item 
            key={page} 
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        
        {/* Next button */}
        <Pagination.Next 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        />
        
        {/* Last page button */}
        {endPage < totalPages && (
          <Pagination.Last 
            onClick={() => onPageChange(totalPages)} 
            disabled={currentPage === totalPages}
          />
        )}
      </Pagination>
    </div>
  );
}

export default Paginator;
