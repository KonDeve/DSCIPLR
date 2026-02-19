import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/views/shared/components/Loader';

export default function RoleGuard({ allowedRoles, children }) {
  const { user, role, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
