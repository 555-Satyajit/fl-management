import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AgronomistDashboard from './AgronomistDashboard';
import FarmerDashboard from './FarmerDashboard';
import UnauthorizedPage from './UnauthorizedPage';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Wrap landing page with PublicRoute */}
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              } 
            />
            <Route
              path="/agronomist/*"
              element={
                <ProtectedRoute allowedRoles={['Agronomist']}>
                  <AgronomistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/*"
              element={
                <ProtectedRoute allowedRoles={['Farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;