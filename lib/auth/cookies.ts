import { AUTH_COOKIES } from "./config";

const isProd = process.env.NODE_ENV === "production";

function cookie(name: string, value: string, maxAge: number, httpOnly = true) {
  return [
    `${name}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
    httpOnly ? "HttpOnly" : "",
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

const FIFTEEN_MIN = 15 * 60;
const SEVEN_DAYS = 7 * 24 * 60 * 60;

export const accessCookie = (token: string) =>
  cookie(AUTH_COOKIES.access, token, FIFTEEN_MIN);

export const refreshCookie = (token: string) =>
  cookie(AUTH_COOKIES.refresh, token, SEVEN_DAYS);

// Indication pour l'interface uniquement : n'est JAMAIS utilisée pour autoriser.
export const roleCookie = (role: string) =>
  cookie(AUTH_COOKIES.role, role, SEVEN_DAYS, false);
