/**
 * Utility functions for permission management
 */

import { 
  PERMISSIONS, 
  ROLES, 
  ROLE_PERMISSIONS,
  ROLE_NAMES,
  PERMISSION_NAMES,
  getRolePermissions,
  hasPermission,
  canAccessRoute,
  canAccessAPI,
  type Permission,
  type Role 
} from '@/lib/config/roles';

// Re-export for convenience
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
  type Permission,
  type Role 
};

/**
 * Get all available roles as an array of objects
 */
export function getAllRoles() {
  return Object.entries(ROLES).map(([key, value]) => ({
    key,
    value,
    name: ROLE_NAMES[value],
    permissions: getRolePermissions(value),
  }));
}

/**
 * Get all available permissions as an array of objects
 */
export function getAllPermissions() {
  return Object.entries(PERMISSIONS).map(([key, value]) => ({
    key,
    value,
    name: PERMISSION_NAMES[value],
  }));
}

/**
 * Get permissions grouped by category
 */
export function getPermissionsByCategory() {
  const categories: { [key: string]: typeof PERMISSIONS[keyof typeof PERMISSIONS][] } = {};
  
  Object.values(PERMISSIONS).forEach(permission => {
    const category = permission.split(':')[0];
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(permission);
  });
  
  return categories;
}

/**
 * Format permission for display
 */
export function formatPermission(permission: Permission): string {
  return PERMISSION_NAMES[permission] || permission;
}

/**
 * Format role for display
 */
export function formatRole(role: Role): string {
  return ROLE_NAMES[role] || role;
}

/**
 * Get permission category
 */
export function getPermissionCategory(permission: Permission): string {
  return permission.split(':')[0];
}
