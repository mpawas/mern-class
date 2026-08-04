export const publicRoutes = ["/", "/auth/login", "/auth/success"];

export const protectedRoutes = ["/dashboard"];

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}
