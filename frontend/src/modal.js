import React, { useState } from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const LogoutButton = ({ user, logout, children }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const handleLogout = () => {
      logout();
      setShowConfirmation(false);
    };
  
    return (
      <>
        <div onClick={() => setShowConfirmation(true)}>
          {children}
        </div>
  
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  Ready to leave?
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for spending time with us today, {user.name.split(' ')[0]}! 
                  Are you sure you want to log out?
                </p>
              </div>
  
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                >
                  Stay
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-[#8B4513] hover:bg-[#6B3410] text-white font-medium transition-colors"
                >
                  Yes, log out
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default LogoutButton;