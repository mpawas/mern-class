import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedRoute, isPublicRoute } from "./lib/route-config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated via cookie
  const userCookie = request.cookies.get("user")?.value;

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute(pathname) && !userCookie) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from public routes (like login)
  if (isPublicRoute(pathname) && userCookie && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
