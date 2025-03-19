import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../common/Loader';
import { ErrorMessage } from '../common/ErrorMessage';

const FarmerSpotlight = () => {
  const [spotlight, setSpotlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/knowledge-base/farmer-spotlight');
        setSpotlight(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching farmer spotlight:', error);
        setError('Failed to load farmer spotlight. Please try again later.');
        setLoading(false);
      }
    };

    fetchSpotlight();
  }, []);

  if (loading) return React.createElement(Loader);
  if (error) return React.createElement(ErrorMessage, { message: error });
  if (!spotlight) return React.createElement('div', null, 'No farmer spotlight available at the moment.');

  return React.createElement(
    'div',
    { className: "farmer-spotlight bg-white rounded-lg shadow-lg overflow-hidden" },
    React.createElement(
      'div',
      { className: "bg-green-600 text-white p-4" },
      React.createElement('h3', { className: "text-xl font-semibold" }, "Smart Farmer of the Month"),
      React.createElement('p', { className: "text-green-100" }, "Highlighting excellence in smart farming practices")
    ),
    React.createElement(
      'div',
      { className: "p-6" },
      React.createElement(
        'div',
        { className: "flex flex-col md:flex-row" },
        React.createElement(
          'div',
          { className: "md:w-1/3 mb-4 md:mb-0" },
          spotlight.farmerSpotlight.photoUrl
            ? React.createElement('img', {
                src: spotlight.farmerSpotlight.photoUrl,
                alt: spotlight.farmerSpotlight.name,
                className: "rounded-lg w-full h-auto object-cover shadow-md"
              })
            : React.createElement(
                'div',
                { className: "bg-gray-200 rounded-lg w-full h-48 flex items-center justify-center" },
                React.createElement('span', { className: "text-4xl" }, "👨‍🌾")
              )
        ),
        React.createElement(
          'div',
          { className: "md:w-2/3 md:pl-6" },
          React.createElement('h4', { className: "text-xl font-bold" }, spotlight.farmerSpotlight.name),
          React.createElement('p', { className: "text-gray-600 mb-3" }, spotlight.farmerSpotlight.location),
          React.createElement(
            'div',
            { className: "mb-4" },
            React.createElement('h5', { className: "font-semibold text-green-700 mb-1" }, "Achievement"),
            React.createElement('p', { className: "text-gray-700" }, spotlight.farmerSpotlight.achievement)
          ),
          React.createElement(
            'div',
            null,
            React.createElement('h5', { className: "font-semibold text-green-700 mb-1" }, "Innovative Technique"),
            React.createElement('p', { className: "text-gray-700" }, spotlight.farmerSpotlight.technique)
          )
        )
      ),
      React.createElement(
        'div',
        { className: "mt-6" },
        React.createElement('h5', { className: "font-semibold text-green-700 mb-2" }, "Interview Highlights"),
        React.createElement(
          'div',
          { className: "bg-gray-50 p-4 rounded-lg" },
          React.createElement('p', { className: "text-gray-700" }, spotlight.content)
        )
      )
    )
  );
};

export default FarmerSpotlight;