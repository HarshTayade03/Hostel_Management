import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, token } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Since JWT is in httpOnly cookie, we rely completely on the user profile state
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If an array of roles is provided and user role is not in it, redirect to their designated dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect logic explicitly handling role-based dashboard landing
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'STAFF') return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
