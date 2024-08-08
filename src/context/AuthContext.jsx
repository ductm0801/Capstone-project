import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

// AuthContext.js
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.Role);
        localStorage.setItem("role", userRole);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);
  console.log(userRole);

  const value = { userRole, setUserRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
