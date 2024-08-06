import React from "react";
import { Navigate } from "react-router-dom";

const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/managerlogin" />;
};

export default PrivateRoute;
