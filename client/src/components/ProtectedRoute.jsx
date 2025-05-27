import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // <-- use 'user' not 'currentUser'
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated, but save the current path for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
