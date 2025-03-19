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
import AboutPage from './about';
import ForumPage from './pages/Network';
import PostDetail from './pages/forum/PostDetail';

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
              path="/about" 
              element={
                <PublicRoute>
                  <AboutPage />
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
                <ProtectedRoute allowedRoles={["Agronomist"]}>
                  <AgronomistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/*"
              element={
                <ProtectedRoute allowedRoles={["Farmer"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forum"
              element={
                <ProtectedRoute allowedRoles={["Farmer", "Agronomist"]}>
                  <ForumPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forum/posts/:id"
              element={
                <ProtectedRoute allowedRoles={["Farmer", "Agronomist"]}>
                  <PostDetail />
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
