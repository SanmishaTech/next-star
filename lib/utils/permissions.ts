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
 * Get all roles with their information
 */
export function getAllRolesInfo() {
  return Object.values(ROLES).map(role => ({
    role,
    name: ROLE_NAMES[role],
    permissions: getRolePermissions(role),
  }));
}

/**
 * Check if a role can be assigned by another role (simple permission-based check)
 */
export function canAssignRole(assignerRole: Role, targetRole: Role): boolean {
  // Admin can assign any role
  if (assignerRole === ROLES.ADMIN) {
    return true;
  }
  
  // Users cannot assign roles
  return false;
}

/**
 * Get the highest role that can be assigned by a given role
 */
export function getHighestAssignableRole(assignerRole: Role): Role | null {
  if (assignerRole === ROLES.ADMIN) {
    return ROLES.ADMIN;
  }
  
  return null;
}

/**
 * Get roles that can be assigned by a given role
 */
export function getAssignableRoles(assignerRole: Role): Role[] {
  if (assignerRole === ROLES.ADMIN) {
    return Object.values(ROLES);
  }
  
  return [];
}

/**
 * Validate permission combination for a custom role
 */
export function validatePermissionCombination(permissions: Permission[]): {
  valid: boolean;
  conflicts: string[];
  suggestions: string[];
} {
  const conflicts: string[] = [];
  const suggestions: string[] = [];
  
  // Check for basic conflicts with our simplified permission system
  const hasUserManage = permissions.includes(PERMISSIONS.USER_MANAGE);
  const hasSettingsManage = permissions.includes(PERMISSIONS.SETTINGS_MANAGE);
  const hasDashboardAdmin = permissions.includes(PERMISSIONS.DASHBOARD_ADMIN);
  const hasDashboardView = permissions.includes(PERMISSIONS.DASHBOARD_VIEW);
  
  // Admin permissions should include view permissions
  if (hasDashboardAdmin && !hasDashboardView) {
    conflicts.push('Dashboard admin permission should include dashboard view');
    suggestions.push('Add DASHBOARD_VIEW permission');
  }
  
  // If user has administrative permissions, they should have dashboard access
  if ((hasUserManage || hasSettingsManage) && !hasDashboardView) {
    suggestions.push('Consider adding DASHBOARD_VIEW for administrative users');
  }
  
  return {
    valid: conflicts.length === 0,
    conflicts,
    suggestions,
  };
}

/**
 * Generate a role comparison matrix
 */
export function generateRoleComparisonMatrix() {
  const roles = Object.values(ROLES);
  const permissions = Object.values(PERMISSIONS);
  
  const matrix: { [role: string]: { [permission: string]: boolean } } = {};
  
  roles.forEach(role => {
    matrix[role] = {};
    permissions.forEach(permission => {
      matrix[role][permission] = hasPermission(role, permission);
    });
  });
  
  return matrix;
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
 * Check if a permission is admin-level (requires admin role)
 */
export function isAdminPermission(permission: Permission): boolean {
  const adminPermissions = getRolePermissions(ROLES.ADMIN);
  const userPermissions = getRolePermissions(ROLES.USER);
  
  return adminPermissions.includes(permission) && 
         !userPermissions.includes(permission);
}

/**
 * Get permission category
 */
export function getPermissionCategory(permission: Permission): string {
  return permission.split(':')[0];
}

/**
 * Group permissions by their categories
 */
export function groupPermissionsByCategory(permissions: Permission[]) {
  const grouped: { [category: string]: Permission[] } = {};
  
  permissions.forEach(permission => {
    const category = getPermissionCategory(permission);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(permission);
  });
  
  return grouped;
}
