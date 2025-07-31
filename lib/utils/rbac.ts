/**
 * RBAC Helper Functions
 * 
 * This file contains all helper functions for role-based access control.
 */

import { PERMISSIONS, PERMISSION_NAMES, type Permission } from '../config/permissions';
import { ROLES, ROLE_NAMES, ROLE_PERMISSIONS, type Role } from '../config/roles';

// Route-based access control
export const ROUTE_PERMISSIONS = {
  '/dashboard': [PERMISSIONS.DASHBOARD_VIEW],
  '/dashboard/admin': [PERMISSIONS.DASHBOARD_ADMIN],
  '/users': [PERMISSIONS.USER_MANAGE],
  '/settings': [PERMISSIONS.SETTINGS_MANAGE],
  '/admin': [PERMISSIONS.DASHBOARD_ADMIN],
} as const;

// API endpoint permissions
export const API_PERMISSIONS = {
  'GET /api/auth/me': [PERMISSIONS.DASHBOARD_VIEW],
  'GET /api/users': [PERMISSIONS.USER_MANAGE],
  'POST /api/users': [PERMISSIONS.USER_MANAGE],
  'PUT /api/users/[id]': [PERMISSIONS.USER_MANAGE],
  'DELETE /api/users/[id]': [PERMISSIONS.USER_MANAGE],
  'GET /api/settings': [PERMISSIONS.SETTINGS_MANAGE],
  'PUT /api/settings': [PERMISSIONS.SETTINGS_MANAGE],
} as const;

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: string): string[] {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  return permissions ? [...permissions] : [];
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: string, permission: string): boolean {
  const rolePermissions = getRolePermissions(role);
  return rolePermissions.includes(permission);
}

/**
 * Check if a role can access a route
 */
export function canAccessRoute(role: string, route: string): boolean {
  const requiredPermissions = ROUTE_PERMISSIONS[route as keyof typeof ROUTE_PERMISSIONS];
  if (!requiredPermissions) return true; // Public route
  
  const rolePermissions = getRolePermissions(role);
  return requiredPermissions.some(permission => rolePermissions.includes(permission));
}

/**
 * Check if a role can access an API endpoint
 */
export function canAccessAPI(role: string, method: string, endpoint: string): boolean {
  const apiKey = `${method} ${endpoint}` as keyof typeof API_PERMISSIONS;
  const requiredPermissions = API_PERMISSIONS[apiKey];
  if (!requiredPermissions) return false; // Protected by default
  
  const rolePermissions = getRolePermissions(role);
  return requiredPermissions.some(permission => rolePermissions.includes(permission));
}

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
