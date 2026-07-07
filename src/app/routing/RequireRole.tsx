import type { ReactNode } from 'react';
import type { BackendRole } from '../../entities/user/types';
import { useAuth } from '../../providers/AuthProvider';
import { Navigate } from 'react-router';

interface RequireRoleProps {
  roles: BackendRole[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
