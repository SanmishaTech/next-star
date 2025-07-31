/**
 * API Permissions Configuration
 * 
 * This file defines which permissions are required to access specific API endpoints.
 */

import { PERMISSIONS } from './permissions';

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

export type ApiPermission = keyof typeof API_PERMISSIONS;
