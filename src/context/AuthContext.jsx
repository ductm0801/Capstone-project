import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.Role);

        localStorage.setItem("role", decoded.Role);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [navigate]);

  const value = { userRole, setUserRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
