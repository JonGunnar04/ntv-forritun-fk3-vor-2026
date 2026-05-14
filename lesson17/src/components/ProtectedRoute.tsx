import { useAuth } from '@/contexts/auth-context';
import { ROUTES } from '@/navigation';
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}
