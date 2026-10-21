import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/config";
import { getAdminFromTokens } from "@/lib/auth/tokens";

// Protège l'interface d'administration en vérifiant la SIGNATURE du JWT.
// Le cookie « role » n'est qu'une indication pour l'interface : un visiteur
// peut le créer lui-même, il ne sert donc jamais à autoriser.
// Les server actions sont protégées séparément (requireAdmin).
export async function middleware(req: NextRequest) {
  const admin = await getAdminFromTokens(
    req.cookies.get(AUTH_COOKIES.access)?.value,
    req.cookies.get(AUTH_COOKIES.refresh)?.value,
  );

  if (!admin) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
