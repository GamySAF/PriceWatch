import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // This ensures that "null", "undefined", or empty strings are all treated as "No Token"
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
export default ProtectedRoute;