/**
 * Utility functions for permission management
 * @deprecated Use '@/lib/config/permissions', '@/lib/config/roles', or '@/lib/utils/rbac' instead
 */

import { 
  PERMISSIONS, 
  PERMISSION_NAMES,
  type Permission,
} from '@/lib/config/permissions';

import { 
  ROLES, 
  ROLE_PERMISSIONS,
  ROLE_NAMES,
  type Role 
} from '@/lib/config/roles';

import {
  getRolePermissions,
  hasPermission,
  canAccessRoute,
  canAccessAPI,
  getAllRoles,
  getAllPermissions,
  getPermissionsByCategory,
  formatPermission,
  formatRole,
  getPermissionCategory,
} from '@/lib/utils/rbac';

// Re-export for backward compatibility
export { 
  PERMISSIONS, 
  ROLES, 
  ROLE_PERMISSIONS,
  ROLE_NAMES,
  PERMISSION_NAMES,
  getRolePermissions,
  hasPermission,
  canAccessRoute,
  canAccessAPI,
  getAllRoles,
  getAllPermissions,
  getPermissionsByCategory,
  formatPermission,
  formatRole,
  getPermissionCategory,
  type Permission,
  type Role 
};
