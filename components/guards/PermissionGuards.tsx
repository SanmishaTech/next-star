/**
 * React components for conditional rendering based on permissions and roles
 */

import React from 'react';
import { usePermissions, useRole, useAnyRole, useIsAdmin, useIsAuthenticated } from '@/hooks/usePermissions';
import { type Permission } from '@/lib/config/permissions';
import { type Role } from '@/lib/config/roles';

interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

/**
 * Component that renders children only if user has the required permission
 */
interface PermissionGuardProps extends ProtectedComponentProps {
  permission: Permission;
}

export function PermissionGuard({ permission, children, fallback = null, loading = null }: PermissionGuardProps) {
  const { hasPermission: checkPermission, isLoading } = usePermissions();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!checkPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only if user has ANY of the required permissions
 */
interface AnyPermissionGuardProps extends ProtectedComponentProps {
  permissions: Permission[];
}

export function AnyPermissionGuard({ permissions, children, fallback = null, loading = null }: AnyPermissionGuardProps) {
  const { hasAnyPermission, isLoading } = usePermissions();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!hasAnyPermission(permissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only if user has ALL of the required permissions
 */
interface AllPermissionsGuardProps extends ProtectedComponentProps {
  permissions: Permission[];
}

export function AllPermissionsGuard({ permissions, children, fallback = null, loading = null }: AllPermissionsGuardProps) {
  const { hasAllPermissions, isLoading } = usePermissions();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!hasAllPermissions(permissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only if user has the required role
 */
interface RoleGuardProps extends ProtectedComponentProps {
  role: Role;
}

export function RoleGuard({ role, children, fallback = null, loading = null }: RoleGuardProps) {
  const { hasRole, isLoading } = useRole(role);

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!hasRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only if user has ANY of the required roles
 */
interface AnyRoleGuardProps extends ProtectedComponentProps {
  roles: Role[];
}

export function AnyRoleGuard({ roles, children, fallback = null, loading = null }: AnyRoleGuardProps) {
  const { hasAnyRole, isLoading } = useAnyRole(roles);

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!hasAnyRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only if user is an admin
 */
interface AdminGuardProps extends ProtectedComponentProps {}

export function AdminGuard({ children, fallback = null, loading = null }: AdminGuardProps) {
  const { isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only for authenticated users
 */
interface AuthGuardProps extends ProtectedComponentProps {}

export function AuthGuard({ children, fallback = null, loading = null }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that renders children only for guests (non-authenticated users)
 */
interface GuestGuardProps extends ProtectedComponentProps {}

export function GuestGuard({ children, fallback = null, loading = null }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Higher-order component for route protection
 */
interface RouteGuardProps extends ProtectedComponentProps {
  route: string;
}

export function RouteGuard({ route, children, fallback = null, loading = null }: RouteGuardProps) {
  const { canAccessRoute: checkRoute, isLoading } = usePermissions();

  if (isLoading) {
    return <>{loading}</>;
  }

  if (!checkRoute(route)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
