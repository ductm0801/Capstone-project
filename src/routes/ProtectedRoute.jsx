import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole } = useAuth();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
