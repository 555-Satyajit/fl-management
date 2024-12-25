// src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Sprout, Mail, Lock } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(email, password, rememberMe);
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
          Welcome back to FarmSmart
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[#E6B17E]/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C1810]">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C1810]">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#8B4513] focus:ring-[#8B4513] border-[#E6B17E]/20 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#2C1810]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#8B4513] hover:text-[#A0522D]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign in'
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
                  New to FarmSmart?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-[#8B4513] rounded-md shadow-sm text-sm font-medium text-[#8B4513] bg-white hover:bg-[#FAF6F1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;