/**
 * Application Roles and Permissions Configuration
 * 
 * This file defines the role-based access control (RBAC) system for the application.
 * It includes role definitions, permissions, and access control mappings.
 */

// Define all available permissions in the system
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view',
  DASHBOARD_ADMIN: 'dashboard:admin',

  // Users
  USER_MANAGE: 'user:manage',

  // Settings
  SETTINGS_MANAGE: 'settings:manage',
} as const;

// Define all available roles in the system
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],

  [ROLES.USER]: [
    PERMISSIONS.DASHBOARD_VIEW,
  ],
} as const;

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

// Helper function to get all permissions for a role
export function getRolePermissions(role: string): string[] {
  const permissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];
  return permissions ? [...permissions] : [];
}

// Helper function to check if a role has a specific permission
export function hasPermission(role: string, permission: string): boolean {
  const rolePermissions = getRolePermissions(role);
  return rolePermissions.includes(permission);
}

// Helper function to check if a role can access a route
export function canAccessRoute(role: string, route: string): boolean {
  const requiredPermissions = ROUTE_PERMISSIONS[route as keyof typeof ROUTE_PERMISSIONS];
  if (!requiredPermissions) return true; // Public route
  
  const rolePermissions = getRolePermissions(role);
  return requiredPermissions.some(permission => rolePermissions.includes(permission));
}

// Helper function to check if a role can access an API endpoint
export function canAccessAPI(role: string, method: string, endpoint: string): boolean {
  const apiKey = `${method} ${endpoint}` as keyof typeof API_PERMISSIONS;
  const requiredPermissions = API_PERMISSIONS[apiKey];
  if (!requiredPermissions) return false; // Protected by default
  
  const rolePermissions = getRolePermissions(role);
  return requiredPermissions.some(permission => rolePermissions.includes(permission));
}

// Helper function to get user-friendly role names
export const ROLE_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.USER]: 'User',
} as const;

// Helper function to get user-friendly permission names
export const PERMISSION_NAMES = {
  [PERMISSIONS.DASHBOARD_VIEW]: 'View Dashboard',
  [PERMISSIONS.DASHBOARD_ADMIN]: 'Admin Dashboard',
  [PERMISSIONS.USER_MANAGE]: 'Manage Users',
  [PERMISSIONS.SETTINGS_MANAGE]: 'Manage Settings',
} as const;

// Export types for TypeScript
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
export type Role = typeof ROLES[keyof typeof ROLES];
export type RoleName = typeof ROLE_NAMES[keyof typeof ROLE_NAMES];
export type PermissionName = typeof PERMISSION_NAMES[keyof typeof PERMISSION_NAMES];
