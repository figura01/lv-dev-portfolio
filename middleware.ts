// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// const allowedOrigins = [
//   "https://lv-dev-portfolio-pink.vercel.app",
//   "http://localhost:3000",
// ];
export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  // Si l'utilisateur n'est pas connecté et essaie d'accéder à /admin
  if (!session && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
