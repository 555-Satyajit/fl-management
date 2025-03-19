import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AgronomistDashboard from './AgronomistDashboard';
import FarmerDashboard from './FarmerDashboard';
import UnauthorizedPage from './UnauthorizedPage';
import AboutPage from './about';
import ForumPage from './pages/Network';
import PostDetail from './pages/forum/PostDetail';
import KnowledgeBaseContainer from './pages/Knowledge'; // ✅ Import Knowledge Base

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
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
            
            {/* ✅ Knowledge Base Route (Accessible to Farmers & Agronomists) */}
            <Route 
              path="/knowledge-base" 
              element={
                <ProtectedRoute allowedRoles={["Farmer", "Agronomist"]}>
                  <KnowledgeBaseContainer />
                </ProtectedRoute>
              } 
            />

            {/* Agronomist Dashboard */}
            <Route
              path="/agronomist/*"
              element={
                <ProtectedRoute allowedRoles={["Agronomist"]}>
                  <AgronomistDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Farmer Dashboard */}
            <Route
              path="/farmer/*"
              element={
                <ProtectedRoute allowedRoles={["Farmer"]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Forum Routes */}
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

            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
