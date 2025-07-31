/**
 * React hooks for client-side permission and role checking
 */

import { useEffect, useState } from 'react';
import { AuthService } from '@/lib/authService';
import { 
  hasPermission, 
  canAccessRoute, 
  getRolePermissions
} from '@/lib/utils/rbac';
import { ROLES, type Role } from '@/lib/config/roles';
import { type Permission } from '@/lib/config/permissions';

export interface UsePermissionsResult {
  permissions: string[];
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccessRoute: (route: string) => boolean;
  role: string | null;
  isLoading: boolean;
}

/**
 * Hook to check user permissions
 */
export function usePermissions(): UsePermissionsResult {
  const [authState, setAuthState] = useState(() => AuthService.getAuthState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const updateAuthState = () => {
      setAuthState(AuthService.getAuthState());
      setIsLoading(false);
    };

    // Initial load
    updateAuthState();

    // Set up a periodic check for auth state changes
    const interval = setInterval(updateAuthState, 1000);

    return () => clearInterval(interval);
  }, []);

  const userRole = authState.user?.role || null;
  const permissions = userRole ? getRolePermissions(userRole) : [];

  return {
    permissions,
    hasPermission: (permission: Permission) => 
      userRole ? hasPermission(userRole, permission) : false,
    hasAnyPermission: (perms: Permission[]) => 
      userRole ? perms.some(p => hasPermission(userRole, p)) : false,
    hasAllPermissions: (perms: Permission[]) => 
      userRole ? perms.every(p => hasPermission(userRole, p)) : false,
    canAccessRoute: (route: string) => 
      userRole ? canAccessRoute(userRole, route) : false,
    role: userRole,
    isLoading,
  };
}

/**
 * Hook to check if user has a specific role
 */
export function useRole(requiredRole: Role): {
  hasRole: boolean;
  role: string | null;
  isLoading: boolean;
} {
  const [authState, setAuthState] = useState(() => AuthService.getAuthState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateAuthState = () => {
      setAuthState(AuthService.getAuthState());
      setIsLoading(false);
    };

    updateAuthState();
    const interval = setInterval(updateAuthState, 1000);
    return () => clearInterval(interval);
  }, []);

  const userRole = authState.user?.role || null;

  return {
    hasRole: userRole === requiredRole,
    role: userRole,
    isLoading,
  };
}

/**
 * Hook to check if user has any of the specified roles
 */
export function useAnyRole(requiredRoles: Role[]): {
  hasAnyRole: boolean;
  role: string | null;
  isLoading: boolean;
} {
  const [authState, setAuthState] = useState(() => AuthService.getAuthState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateAuthState = () => {
      setAuthState(AuthService.getAuthState());
      setIsLoading(false);
    };

    updateAuthState();
    const interval = setInterval(updateAuthState, 1000);
    return () => clearInterval(interval);
  }, []);

  const userRole = authState.user?.role || null;

  return {
    hasAnyRole: userRole ? requiredRoles.includes(userRole as Role) : false,
    role: userRole,
    isLoading,
  };
}

/**
 * Hook to check if user is admin
 */
export function useIsAdmin(): {
  isAdmin: boolean;
  role: string | null;
  isLoading: boolean;
} {
  const { hasRole, role, isLoading } = useRole(ROLES.ADMIN);
  return {
    isAdmin: hasRole,
    role,
    isLoading,
  };
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
} {
  const [authState, setAuthState] = useState(() => AuthService.getAuthState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateAuthState = () => {
      setAuthState(AuthService.getAuthState());
      setIsLoading(false);
    };

    updateAuthState();
    const interval = setInterval(updateAuthState, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading,
  };
}
