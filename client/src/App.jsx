import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search'; // Added Search page
import WorkerDashboard from './pages/WorkerDashboard';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/common/Footer';

// Robust Protected Route Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Ensure both token and user data exist before allowing access
  return (isAuthenticated && user) ? children : <Navigate to="/login" />;
};


function App() {

  return (
    <AuthProvider>
      <Router>
        {/* Navbar stays consistent across all views */}
        {<Navbar />}
        
        {/* Main content container with top padding for fixed Navbar */}
        <div className="pt-16 min-h-screen bg-white"> 
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Hyperlocal Search Route (Accessible to logged-in users) */}
            <Route 
              path="/search" 
              element={
                <PrivateRoute>
                  <Search />
                </PrivateRoute>
              } 
            />

            {/* Worker Management Route */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <WorkerDashboard /> 
                </PrivateRoute>
              } 
            />

            {/* Catch-all 404 Route */}
            <Route 
              path="*" 
              element={
                <div className="flex flex-col items-center justify-center h-[80vh]">
                  <h1 className="text-9xl font-black text-slate-100">404</h1>
                  <p className="text-xl text-slate-400 -mt-8 font-bold">Page not found</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-6 text-blue-600 font-bold hover:underline"
                  >
                    Return Home
                  </button>
                </div>
              } 
            />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;