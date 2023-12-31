import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootRedirectRoute = ({ children }) => {
  const { currentUser } = useAuth();
  let location = useLocation();

  if (currentUser) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return children;
};

export default RootRedirectRoute;
