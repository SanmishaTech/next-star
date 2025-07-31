/**
 * Application Roles Configuration
 * 
 * This file defines all available roles and their permission mappings.
 */

import { PERMISSIONS } from './permissions';

// Define all available roles in the system
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Helper function to get user-friendly role names
export const ROLE_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.USER]: 'User',
} as const;

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],

  [ROLES.USER]: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_EDIT
  ],
} as const;

// Export types for TypeScript
export type Role = typeof ROLES[keyof typeof ROLES];
export type RoleName = typeof ROLE_NAMES[keyof typeof ROLE_NAMES];
