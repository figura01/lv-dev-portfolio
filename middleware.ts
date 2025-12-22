import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function middleware(request: NextRequest) {
  try {
    // Récupérer la session avec better-auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté et essaie d'accéder à /admin
    if (!session?.user && isAdminPage) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    // Rediriger vers /admin si l'utilisateur est connecté et essaie d'accéder à une page d'authentification
    if (session?.user && isAuthPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // En cas d'erreur, rediriger vers la page de connexion pour les routes admin
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
