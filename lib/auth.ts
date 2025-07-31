import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import { 
  hasPermission, 
  canAccessAPI, 
  getRolePermissions
} from '@/lib/utils/rbac';
import { type Permission } from '@/lib/config/permissions';
import { type Role } from '@/lib/config/roles';

export interface AuthUser {
  userId: number;
  email: string;
  role: string;
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(jwtSecret);

    const { payload: decoded } = await jwtVerify(token, secretKey);
    
    return {
      userId: decoded.userId as number,
      email: decoded.email as string,
      role: decoded.role as string,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    return await verifyToken(token);
  } catch (error) {
    console.error('Auth extraction failed:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<{ user: AuthUser } | { error: Response }> {
  const user = await getAuthUser(request);
  
  if (!user) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Authentication required' 
        }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

export async function requireRole(request: NextRequest, allowedRoles: string[]): Promise<{ user: AuthUser } | { error: Response }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  const { user } = authResult;
  
  if (!allowedRoles.includes(user.role)) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Insufficient permissions' 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

// New permission-based auth functions
export async function requirePermission(request: NextRequest, permission: Permission): Promise<{ user: AuthUser } | { error: Response }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  const { user } = authResult;
  
  if (!hasPermission(user.role, permission)) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: `Permission required: ${permission}` 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

export async function requireAnyPermission(request: NextRequest, permissions: Permission[]): Promise<{ user: AuthUser } | { error: Response }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  const { user } = authResult;
  
  const hasAnyPermission = permissions.some(permission => hasPermission(user.role, permission));
  
  if (!hasAnyPermission) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: `One of these permissions required: ${permissions.join(', ')}` 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

export async function requireAllPermissions(request: NextRequest, permissions: Permission[]): Promise<{ user: AuthUser } | { error: Response }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  const { user } = authResult;
  
  const hasAllPermissions = permissions.every(permission => hasPermission(user.role, permission));
  
  if (!hasAllPermissions) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: `All of these permissions required: ${permissions.join(', ')}` 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

// API-specific permission check
export async function requireAPIAccess(request: NextRequest, method: string, endpoint: string): Promise<{ user: AuthUser } | { error: Response }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  const { user } = authResult;
  
  if (!canAccessAPI(user.role, method, endpoint)) {
    return {
      error: new Response(
        JSON.stringify({ 
          success: false, 
          error: `Access denied for ${method} ${endpoint}` 
        }),
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    };
  }

  return { user };
}

// Helper function to get user permissions
export function getUserPermissions(user: AuthUser): string[] {
  return getRolePermissions(user.role);
}
