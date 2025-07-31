/**
 * Next.js Middleware for route-based authentication and authorization
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { canAccessRoute, hasPermission } from '@/lib/utils/rbac';

// Define protected routes and their required permissions
const PROTECTED_ROUTES = {
  '/dashboard': 'dashboard:view',
  '/users': 'user:manage',
  '/admin': 'dashboard:admin',
  '/settings': 'settings:manage',
} as const;

// Routes that require authentication but no specific permissions
const AUTH_REQUIRED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
] as const;

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
] as const;

function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies (both authToken and auth-token)
  const tokenCookie = request.cookies.get('authToken') || request.cookies.get('auth-token');
  if (tokenCookie) {
    return tokenCookie.value;
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and public assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/public/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  if (PUBLIC_ROUTES.includes(pathname as any)) {
    // For root path, redirect based on auth status
    if (pathname === '/') {
      const token = getTokenFromRequest(request);
      const user = token ? await verifyToken(token) : null;
      
      if (user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    
    return NextResponse.next();
  }

  // Get token from request
  const token = getTokenFromRequest(request);
  const user = token ? await verifyToken(token) : null;

  // Check if route requires authentication
  const requiresAuth = AUTH_REQUIRED_ROUTES.some(route => pathname.startsWith(route)) ||
                      Object.keys(PROTECTED_ROUTES).some(route => pathname.startsWith(route));
  
  if (requiresAuth && !user) {
    // Redirect to login if authentication is required
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check route-specific permissions
  const protectedRoute = Object.keys(PROTECTED_ROUTES).find(route => pathname.startsWith(route));
  
  if (protectedRoute && user) {
    const requiredPermission = PROTECTED_ROUTES[protectedRoute as keyof typeof PROTECTED_ROUTES];
    
    if (!hasPermission(user.role, requiredPermission)) {
      // Redirect to unauthorized page or dashboard
      const unauthorizedUrl = new URL('/dashboard', request.url); // Redirect to dashboard for now
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
