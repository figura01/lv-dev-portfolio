import { SignJWT, jwtVerify } from "jose";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "./config";
import { UserSession } from "./types";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signAccessToken(user: UserSession) {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(secret);
}

export async function signRefreshToken(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(secret);
}

export async function verifyToken<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch {
    return null;
  }
}
