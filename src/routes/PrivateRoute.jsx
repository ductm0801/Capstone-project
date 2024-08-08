import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role === "Manager" ? children : <Navigate to="/managerlogin" />;
};

export default PrivateRoute;
