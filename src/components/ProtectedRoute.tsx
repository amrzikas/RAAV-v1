import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (!user && !hasNotified) {
      addToast('Please sign in to access this page.', 'info');
      setHasNotified(true);
    } else if (requireAdmin && user?.role !== 'admin' && !hasNotified) {
      addToast('Unauthorized access. Admin privileges required.', 'error');
      setHasNotified(true);
    }
  }, [user, requireAdmin, addToast, hasNotified]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
