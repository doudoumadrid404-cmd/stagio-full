import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import SearchOffers from './pages/student/SearchOffers';
import StudentApplications from './pages/student/Applications';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyOffers from './pages/company/ManageOffers';
import CompanyApps from './pages/company/Applications';
import AdminDashboard from './pages/admin/Dashboard';
import AdminValidations from './pages/admin/Validations';
import AdminConventions from './pages/admin/Conventions';
import AdminUsers from './pages/admin/Users';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Home />;
  
  switch (user.role) {
    case 'student': return <Navigate to="/student" />;
    case 'company': return <Navigate to="/company" />;
    case 'administration': return <Navigate to="/admin" />;
    default: return <Home />;
  }
};



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Layout><StudentDashboard /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          } />

          <Route path="/student/offers" element={
            <ProtectedRoute allowedRoles={['student']}>
              <SearchOffers />
            </ProtectedRoute>
          } />

          <Route path="/student/applications" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentApplications />
            </ProtectedRoute>
          } />
          
          <Route path="/company" element={
            <ProtectedRoute allowedRoles={['company']}>
              <Layout><CompanyDashboard /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/company/offers" element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyOffers />
            </ProtectedRoute>
          } />

          <Route path="/company/applications" element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyApps />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['administration']}>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/validations" element={
            <ProtectedRoute allowedRoles={['administration']}>
              <AdminValidations />
            </ProtectedRoute>
          } />

          <Route path="/admin/conventions" element={
            <ProtectedRoute allowedRoles={['administration']}>
              <AdminConventions />
            </ProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['administration']}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          <Route path="/" element={<HomeRedirect />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
