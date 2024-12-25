import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page.
        </p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;