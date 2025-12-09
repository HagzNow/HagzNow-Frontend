import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../Contexts/AuthContext';

/**
 * Protect routes by authentication and optional role(s).
 * - role: single role string
 * - roles: array of allowed roles
 * - redirectTo: path when not authenticated
 * - fallbackPath: path when role not allowed
 */
export default function ProtectedRoutes({ role, roles, redirectTo = '/login', fallbackPath = '/home', children }) {
  const { user, token } = useContext(authContext);

  // Auth loading state: avoid flash while token exists but user not yet loaded
  if (token && !user) return null;

  if (!user || !token) return <Navigate to={redirectTo} />;

  const allowedRoles = roles || (role ? [role] : null);
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={fallbackPath} />;

  return children;
}
