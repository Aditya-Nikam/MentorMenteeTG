import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await authService.getCurrentUser();
      console.log(user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isAuthenticated === null) {
    // Optionally, you can return a loading spinner or null while the authentication check is in progress
    return <div>Loading...</div>;
  }
    
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
