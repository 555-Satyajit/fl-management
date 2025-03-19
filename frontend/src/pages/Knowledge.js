import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DailyTip from '../components/KnowledgeBase/DailyTip';
import MythsVsFacts from '../components/KnowledgeBase/MythsVsFacts';
import FunFacts from '../components/KnowledgeBase/FunFacts';
import FarmerSpotlight from '../components/KnowledgeBase/FarmerSpotlight';
import SuccessStories from '../components/KnowledgeBase/SuccessStories';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';

const KnowledgeBaseContainer = () => {
  const [activeTab, setActiveTab] = useState('tips');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user's location for weather-based tips
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default location if user denies permission
          setLocation({
            latitude: 28.6139, // Default to New Delhi
            longitude: 77.2090
          });
        }
      );
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'tips':
        return React.createElement(DailyTip, { location: location });
      case 'myths':
        return React.createElement(MythsVsFacts);
      case 'facts':
        return React.createElement(FunFacts);
      case 'spotlight':
        return React.createElement(FarmerSpotlight);
      case 'stories':
        return React.createElement(SuccessStories);
      default:
        return React.createElement(DailyTip, { location: location });
    }
  };

  return React.createElement(
    'div',
    { className: "knowledge-base-container" },
    React.createElement('h2', { className: "text-2xl font-bold mb-4" }, "Smart Farming Knowledge Base"),
    React.createElement(
      'div',
      { className: "tabs-container mb-4" },
      React.createElement(
        'ul',
        { className: "flex border-b" },
        React.createElement(
          'li',
          { className: `mr-1 ${activeTab === 'tips' ? 'border-b-2 border-green-500' : ''}` },
          React.createElement(
            'button',
            {
              className: "px-4 py-2 font-semibold",
              onClick: () => setActiveTab('tips')
            },
            "Daily Tips"
          )
        ),
        React.createElement(
          'li',
          { className: `mr-1 ${activeTab === 'myths' ? 'border-b-2 border-green-500' : ''}` },
          React.createElement(
            'button',
            {
              className: "px-4 py-2 font-semibold",
              onClick: () => setActiveTab('myths')
            },
            "Myths vs Facts"
          )
        ),
        React.createElement(
          'li',
          { className: `mr-1 ${activeTab === 'facts' ? 'border-b-2 border-green-500' : ''}` },
          React.createElement(
            'button',
            {
              className: "px-4 py-2 font-semibold",
              onClick: () => setActiveTab('facts')
            },
            "Fun Facts"
          )
        ),
        React.createElement(
          'li',
          { className: `mr-1 ${activeTab === 'spotlight' ? 'border-b-2 border-green-500' : ''}` },
          React.createElement(
            'button',
            {
              className: "px-4 py-2 font-semibold",
              onClick: () => setActiveTab('spotlight')
            },
            "Farmer Spotlight"
          )
        ),
        React.createElement(
          'li',
          { className: `mr-1 ${activeTab === 'stories' ? 'border-b-2 border-green-500' : ''}` },
          React.createElement(
            'button',
            {
              className: "px-4 py-2 font-semibold",
              onClick: () => setActiveTab('stories')
            },
            "Success Stories"
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: "content-container" },
      loading 
        ? React.createElement(Loader) 
        : error 
        ? React.createElement(ErrorMessage, { message: error }) 
        : renderContent()
    )
  );
};

export default KnowledgeBaseContainer;
