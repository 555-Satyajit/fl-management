// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored token and user data on mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // In your AuthContext.js, update the login function:
  const login = async (email, password, rememberMe) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      const { token, user: userData } = data;
  
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
  
      setUser(userData);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (userData.role === 'Agronomist') {
        navigate('/agronomist');
      } else if (userData.role === 'Farmer') {
        navigate('/farmer');
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  

// Set default configs
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';

// Update the register function
// Update the register function
const register = async (userData) => {
  try {
    setLoading(true);
    const { data } = await axios.post('/api/auth/register', userData, {
      withCredentials: true // Ensure credentials (cookies) are included
    });
    toast.success('Registration successful! Please check your email for verification.');
    navigate('/login');
    return data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    toast.error(message);
    throw new Error(message);
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      setUser(prev => ({ ...prev, ...profileData }));
      localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;