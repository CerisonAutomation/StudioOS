import { NextRequest, NextResponse } from 'next/server';

// Performance middleware for API routes
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add performance headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Add caching headers for API responses
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/api/')) {
    // Cache static data for 5 minutes
    if (path.includes('/static/') || path.includes('/config/')) {
      response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
    }
    // Cache user data for 2 minutes
    else if (path.includes('/user/') || path.includes('/profile/')) {
      response.headers.set('Cache-Control', 'private, max-age=120');
    }
    // Cache search results for 1 minute
    else if (path.includes('/search/')) {
      response.headers.set('Cache-Control', 'public, max-age=60');
    }
    // Default API caching
    else {
      response.headers.set('Cache-Control', 'no-cache');
    }
  }
  
  // Add performance timing headers
  response.headers.set('Server-Timing', 'app;desc="Tanti StudioOS API"');
  
  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};