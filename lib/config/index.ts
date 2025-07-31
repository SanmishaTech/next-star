/**
 * RBAC System Main Export
 * 
 * This file serves as the main entry point for the RBAC system,
 * re-exporting all necessary constants, types, and functions.
 */

// Export permissions
export {
  PERMISSIONS,
  PERMISSION_NAMES,
  type Permission,
  type PermissionName,
} from './permissions';

// Export roles
export {
  ROLES,
  ROLE_NAMES,
  ROLE_PERMISSIONS,
  type Role,
  type RoleName,
} from './roles';

// Export helper functions and route/API permissions
export {
  ROUTE_PERMISSIONS,
  API_PERMISSIONS,
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
} from '../utils/rbac';
