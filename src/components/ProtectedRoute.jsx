import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../api/axios';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get('/users/profile'); // Backend verifies cookie
        setAuthenticated(true);
      } catch (err) {
        console.error('Auth check failed:', err.response?.data?.message || err.message);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}
