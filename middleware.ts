// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const allowedOrigins = [
  "https://lv-dev-portfolio-pink.vercel.app",
  "http://localhost:3000",
];
export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }
  return response;
}
export const config = {
  matcher: "/api/:path*",
};
