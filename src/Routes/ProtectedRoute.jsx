import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function ProtectedRoutes({ role, children }) {
  let { user, token } = useContext(authContext);

  if (token && !user) return null;

  if (!user || !token) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/home" />;
  return children;
}
