import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProtectedRouteProps = {
  requiredRole?: 'user' | 'admin';
};

const ProtectedRoute = ({ requiredRole = 'user' }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && user.role !== 'admin') {
    // Logged in but not an admin, redirect to home or show unauthorized
    return <Navigate to="/" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
