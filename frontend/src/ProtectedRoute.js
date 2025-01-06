import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent browser back button after authentication
  useEffect(() => {
    const preventBackNavigation = (e) => {
      if (user) {
        window.history.pushState(null, null, location.pathname);
      }
    };

    window.history.pushState(null, null, location.pathname);
    window.addEventListener('popstate', preventBackNavigation);

    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, [user, location.pathname]);

  // Handle navigation attempts to login page while authenticated
  useEffect(() => {
    if (user && location.pathname === '/login') {
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

  if (!user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;