import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "../../store";

export default function AdminRoute({ element }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Get user details from the backend
        const response = await axios.get(`${API_URL}/auth/users/me/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const userData = response.data;
        console.log("User data from API:", userData);
        
        // Check if user has admin role
        setIsAdmin(userData.role === "admin");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);
  
  if (loading) {
    // Show loading state while checking admin status
    return <div>Loading...</div>;
  }
  
  if (!isAdmin) {
    console.log("Access denied: User is not admin");
    return <Navigate to="/" replace />;
  }
  
  return element;
};
