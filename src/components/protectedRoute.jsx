import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ component: Component }) {
  const { currentUser } = useAuth();

  return currentUser ? <Component /> : <Navigate to="/login" />;
}
