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

// Export route and API permissions from their config files
export { ROUTE_PERMISSIONS } from './routes';
export { API_PERMISSIONS } from './api';

// Export helper functions
export {
  getRolePermissions,
  hasPermission,
  canAccessRoute,
  canAccessAPI,
} from '../utils/rbac';
