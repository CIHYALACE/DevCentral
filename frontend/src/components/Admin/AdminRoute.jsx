import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT payload

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
