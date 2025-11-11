// src/components/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContextdata } from "../context/AuthContextdata";

const ProtectedRoute = ({ children }) => {
  const { curruser } = useContext(AuthContextdata);

  if (!curruser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
