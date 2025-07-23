import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /login)
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password', '/'];

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(pathname);

  // All routes require authentication except public paths
  const requiresAuth = !isPublicPath;

  // Get the token from the request cookies
  const token = request.cookies.get('authToken')?.value;

  // If the user is on a public path and has a token, redirect to dashboard
  if (isPublicPath && token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not on a public path and doesn't have a token, redirect to login
  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For the root path, redirect to login if no token, dashboard if token exists
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
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
