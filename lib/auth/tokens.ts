import { SignJWT, jwtVerify } from "jose";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "./config";
import { UserSession } from "./types";

// Lu à l'usage (et non au chargement du module) pour ne jamais signer avec une
// clé vide si JWT_SECRET est absent de l'environnement.
function getSecret() {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) {
    throw new Error("JWT_SECRET manquant ou trop court (32 caractères minimum).");
  }
  return new TextEncoder().encode(value);
}

type TokenType = "access" | "refresh";

// Ne mettre dans un jeton que l'id, l'e-mail et le rôle : le contenu d'un JWT
// est lisible par quiconque possède le jeton.
function toSessionUser(user: UserSession): UserSession {
  return { id: user.id, email: user.email, role: user.role };
}

export async function signAccessToken(user: UserSession) {
  return new SignJWT({ user: toSessionUser(user), typ: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(getSecret());
}

export async function signRefreshToken(user: UserSession) {
  return new SignJWT({ user: toSessionUser(user), typ: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(getSecret());
}

export async function verifyToken<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    return payload as T;
  } catch {
    return null;
  }
}

type TokenPayload = { user?: UserSession; typ?: TokenType; exp?: number };

async function userFromToken(token: string | undefined, typ: TokenType) {
  if (!token) return null;
  const payload = await verifyToken<TokenPayload>(token);
  if (!payload?.user || payload.typ !== typ) return null;
  return { user: payload.user, exp: payload.exp };
}

/**
 * Utilisateur authentifié à partir des cookies : jeton d'accès valide, sinon
 * jeton de rafraîchissement valide. Utilisable dans le middleware (edge).
 */
export async function getUserFromTokens(access?: string, refresh?: string) {
  return (
    (await userFromToken(access, "access")) ??
    (await userFromToken(refresh, "refresh"))
  );
}

export async function getAdminFromTokens(access?: string, refresh?: string) {
  const result = await getUserFromTokens(access, refresh);
  return result?.user.role === "ADMIN" ? result.user : null;
}
