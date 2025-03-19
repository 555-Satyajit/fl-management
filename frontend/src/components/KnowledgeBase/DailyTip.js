import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../common/Loader';
import { ErrorMessage } from '../common/ErrorMessage';

const DailyTip = ({ location }) => {
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTip = async () => {
      if (!location) return;
      
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/knowledge-base/tip`, {
          params: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        });
        
        setTip(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching daily tip:', error);
        setError('Failed to load farming tip. Please try again later.');
        setLoading(false);
      }
    };

    fetchTip();
  }, [location]);

  if (loading) return React.createElement(Loader);
  if (error) return React.createElement(ErrorMessage, { message: error });
  if (!tip) return React.createElement('div', null, 'No farming tips available at the moment.');

  return React.createElement(
    'div',
    { className: "daily-tip bg-green-50 p-6 rounded-lg shadow-md" },
    React.createElement(
      'div',
      { className: "flex items-center mb-4" },
      React.createElement('span', { className: "text-3xl mr-3" }, "🌱"),
      React.createElement('h3', { className: "text-xl font-semibold" }, "Today's Smart Farming Tip")
    ),
    React.createElement(
      'div',
      { className: "tip-content" },
      React.createElement('h4', { className: "text-lg font-medium mb-2" }, tip.title),
      React.createElement('p', { className: "text-gray-700" }, tip.content)
    ),
    React.createElement(
      'div',
      { className: "mt-4 text-sm text-gray-500" },
      `Tip relevant for: ${tip.season.charAt(0).toUpperCase() + tip.season.slice(1)} season`,
      tip.weatherCondition !== 'all' && ` • ${tip.weatherCondition.charAt(0).toUpperCase() + tip.weatherCondition.slice(1)} weather`
    )
  );
};

export default DailyTip;
