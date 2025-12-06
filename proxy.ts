// app/proxy.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si l'utilisateur essaie d'accéder à /admin sans être connecté
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Si pas de token, rediriger vers la page de connexion
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Pour toutes les autres requêtes, laisser passer
  return NextResponse.next();
}

export const config = {
  // N'appliquer le middleware que sur les routes qui commencent par /admin
  matcher: ["/admin/:path*"],
};
