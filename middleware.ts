import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  if (isAuthPage || isAdminPage) {
    const sessionToken = request.cookies.get(
      process.env.NODE_ENV === "production"
        ? "__Secure-auth-session"
        : "auth-session"
    )?.value;

    // Pour les routes admin, vérifiez le token via l'API
    if (isAdminPage && !sessionToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    // Redirigez les utilisateurs connectés de la page d'authentification
    if (isAuthPage && sessionToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  return NextResponse.next();
}
