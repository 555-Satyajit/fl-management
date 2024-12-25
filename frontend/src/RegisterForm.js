// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Sprout, Mail, Lock, User, UserCircle } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer'
  });
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();

  const roles = ['Farmer', 'Agronomist', 'Viewer'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Sprout className="h-12 w-12 text-[#8B4513]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-[#2C1810]">
          Join FarmSmart
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[#E6B17E]/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2C1810]">
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-[#E6B17E]/20'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]`}
                />
                <User className="absolute right-3 top-2.5 h-5 w-5 text-[#8B4513]/40" />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C1810]">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-[#E6B17E]/20'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]`}
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-[#8B4513]/40" />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[#2C1810]">
                Role
              </label>
              <div className="mt-1 relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-[#E6B17E]/20 rounded-md shadow-sm focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <UserCircle className="absolute right-3 top-2.5 h-5 w-5 text-[#8B4513]/40" />
              </div>
            </div>

            {/* Password Fields */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C1810]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-[#E6B17E]/20'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]`}
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-[#8B4513]/40" />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C1810]">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#E6B17E]/20'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]`}
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-[#8B4513]/40" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E6B17E]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#2C1810]">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-[#8B4513] rounded-md shadow-sm text-sm font-medium text-[#8B4513] bg-white hover:bg-[#FAF6F1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;