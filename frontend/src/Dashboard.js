import React from 'react';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAF6F1] p-8">
      <h1 className="text-3xl font-bold text-[#2C1810]">Welcome, {user.name}</h1>
      <button
        onClick={logout}
        className="mt-4 bg-[#8B4513] text-white px-6 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};
export default Dashboard;