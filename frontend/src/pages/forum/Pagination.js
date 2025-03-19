// src/components/forum/Pagination.js
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // Start creating array of pages to show
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Always show at least 5 pages if available
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(endPage - 4, 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 mx-1 rounded-md hover:bg-gray-100"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 py-2">
            ...
          </span>
        );
      }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 mx-1 rounded-md ${
            i === currentPage
              ? 'bg-green-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 py-2">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 mx 1 rounded-md hover:bg-gray-100"
>
{totalPages}
</button>
);
    }return pages;
};
if (totalPages <= 1) return null;
return (
<div className="flex justify-center mt-8">
<div className="flex items-center">
<button
onClick={() => onPageChange(currentPage - 1)}
disabled={currentPage === 1}
className="px-2 py-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
>
<ChevronLeftIcon className="h-5 w-5" />
</button>
{renderPageNumbers()}
    
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-2 py-2 mx-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      <ChevronRightIcon className="h-5 w-5" />
    </button>
  </div>
</div>
);
};
export default Pagination;