export const ACCESS_TOKEN_TTL = "15m";
export const REFRESH_TOKEN_TTL = "7d";

export const AUTH_COOKIES = {
  access: "token",
  refresh: "refreshToken",
  role: "role",
};
export const JWT_SECRET = process.env.JWT_SECRET;
