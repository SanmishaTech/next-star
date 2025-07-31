/**
 * Application Permissions Configuration
 * 
 * This file defines all available permissions in the system.
 * Permissions are organized by feature/module for better maintainability.
 */

// Define all available permissions in the system
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view',
  DASHBOARD_ADMIN: 'dashboard:admin',

  // Users
  USER_MANAGE: 'user:manage',
  USER_VIEW: 'user:view',
  USER_EDIT: 'user:edit',
  USER_DELETE: 'user:delete',
  USER_CREATE: 'user:create',

  // Settings
  SETTINGS_MANAGE: 'settings:manage',

  // Admin
  ADMIN_FULL_ACCESS: 'admin:full_access',
} as const;

// Helper function to get user-friendly permission names
export const PERMISSION_NAMES = {
  [PERMISSIONS.DASHBOARD_VIEW]: 'View Dashboard',
  [PERMISSIONS.DASHBOARD_ADMIN]: 'Admin Dashboard',
  [PERMISSIONS.USER_MANAGE]: 'Manage Users',
  [PERMISSIONS.USER_VIEW]: 'View Users',
  [PERMISSIONS.USER_EDIT]: 'Edit Users',
  [PERMISSIONS.USER_DELETE]: 'Delete Users',
  [PERMISSIONS.USER_CREATE]: 'Create Users',
  [PERMISSIONS.SETTINGS_MANAGE]: 'Manage Settings',
  [PERMISSIONS.ADMIN_FULL_ACCESS]: 'Full Admin Access',
} as const;

// Export types for TypeScript
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
export type PermissionName = typeof PERMISSION_NAMES[keyof typeof PERMISSION_NAMES];
