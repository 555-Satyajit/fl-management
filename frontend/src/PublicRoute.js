import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      const defaultRoute = user.role === 'Farmer' ? '/farmer' : '/agronomist';
      navigate(defaultRoute, { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF6F1]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  if (user) {
    // Redirect to appropriate dashboard if already authenticated
    const defaultRoute = user.role === 'Farmer' ? '/farmer' : '/agronomist';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default PublicRoute;