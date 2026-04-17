import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// roles = [] means any logged-in user can access
const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;