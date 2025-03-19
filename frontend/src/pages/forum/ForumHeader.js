// src/components/forum/ForumHeader.js
import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const ForumHeader = ({ onCreatePost, onSearch, onTagSelect, selectedTag }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const popularTags = ['Crops', 'Irrigation', 'Organic', 'Pests', 'Weather', 'Market'];
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <div className="bg-green-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Farmer's Forum</h1>
            <p className="text-green-100">
              Connect with fellow farmers, share knowledge, and get advice
            </p>
          </div>
          
          <button
            onClick={onCreatePost}
            className="mt-4 md:mt-0 bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition duration-200 shadow-md"
          >
            Start a Discussion
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-green-800 text-white placeholder-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-green-300" />
              </div>
            </div>
          </form>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag === selectedTag ? '' : tag)}
                className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition duration-200 ${
                  selectedTag === tag
                    ? 'bg-white text-green-700'
                    : 'bg-green-800 text-green-100 hover:bg-green-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;