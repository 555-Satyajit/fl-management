import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../common/Loader';
import { ErrorMessage } from '../common/ErrorMessage';

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/knowledge-base/success-stories', {
          params: { page: currentPage, limit: 3 }
        });
        
        setStories(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching success stories:', error);
        setError('Failed to load success stories. Please try again later.');
        setLoading(false);
      }
    };

    fetchStories();
  }, [currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return React.createElement(Loader);
  if (error) return React.createElement(ErrorMessage, { message: error });
  if (stories.length === 0) return React.createElement('div', null, 'No success stories available at the moment.');

  return React.createElement(
    'div',
    { className: "success-stories" },
    React.createElement('h3', { className: "text-xl font-semibold mb-4" }, "Success Stories: Smart Farming in Action"),
    React.createElement(
      'div',
      { className: "space-y-6" },
      stories.map((story) => React.createElement(
        'div',
        { key: story._id, className: "story-card bg-white rounded-lg shadow-md overflow-hidden" },
        React.createElement(
          'div',
          { className: "p-5" },
          React.createElement('h4', { className: "text-lg font-bold mb-2" }, story.title),
          React.createElement('p', { className: "text-gray-700 mb-4" }, story.content),
          React.createElement(
            'div',
            { className: "flex items-center text-sm text-gray-500" },
            React.createElement(
              'span',
              { className: "mr-4" },
              React.createElement('span', { className: "font-medium" }, "Water saved:"),
              " 40%"
            ),
            React.createElement(
              'span',
              { className: "mr-4" },
              React.createElement('span', { className: "font-medium" }, "Yield increased:"),
              " 25%"
            ),
            React.createElement(
              'span',
              null,
              React.createElement('span', { className: "font-medium" }, "Region:"),
              " " + story.tags.join(', ')
            )
          )
        )
      ))
    ),
    totalPages > 1 && React.createElement(
      'div',
      { className: "pagination flex justify-center mt-6" },
      React.createElement(
        'button',
        {
          onClick: () => changePage(currentPage - 1),
          disabled: currentPage === 1,
          className: "px-4 py-2 mr-2 bg-gray-200 rounded-md disabled:opacity-50"
        },
        "Previous"
      ),
      React.createElement(
        'div',
        { className: "flex space-x-1" },
        [...Array(totalPages)].map((_, index) => React.createElement(
          'button',
          {
            key: index,
            onClick: () => changePage(index + 1),
            className: `w-8 h-8 rounded-full ${
              currentPage === index + 1 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200'
            }`
          },
          index + 1
        ))
      ),
      React.createElement(
        'button',
        {
          onClick: () => changePage(currentPage + 1),
          disabled: currentPage === totalPages,
          className: "px-4 py-2 ml-2 bg-gray-200 rounded-md disabled:opacity-50"
        },
        "Next"
      )
    )
  );
};

export default SuccessStories;
