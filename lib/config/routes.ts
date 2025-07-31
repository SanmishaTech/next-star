/**
 * Route Permissions Configuration
 * 
 * This file defines which permissions are required to access specific routes.
 */

import { PERMISSIONS } from './permissions';

// Route-based access control
export const ROUTE_PERMISSIONS = {
  '/dashboard': [PERMISSIONS.DASHBOARD_VIEW],
  '/dashboard/admin': [PERMISSIONS.DASHBOARD_ADMIN],
  '/users': [PERMISSIONS.USER_MANAGE],
  '/settings': [PERMISSIONS.SETTINGS_MANAGE],
  '/admin': [PERMISSIONS.DASHBOARD_ADMIN],
} as const;

export type RoutePermission = keyof typeof ROUTE_PERMISSIONS;
