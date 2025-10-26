import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ role, children }) {
  let { user } = useContext(authContext);

  if (user === null) {
    return null;
  }
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/home" />;
  return children;
}
