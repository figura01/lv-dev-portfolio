import { cookies } from "next/headers";
import { AUTH_COOKIES } from "./config";
import { getAdminFromTokens, getUserFromTokens } from "./tokens";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const result = await getUserFromTokens(
    store.get(AUTH_COOKIES.access)?.value,
    store.get(AUTH_COOKIES.refresh)?.value,
  );
  if (!result) return null;

  return {
    user: result.user,
    expiresAt: new Date((result.exp ?? 0) * 1000),
  };
}

/**
 * À appeler en première ligne de toute server action qui écrit en base.
 * Les server actions sont des points d'entrée publics : sans ce contrôle,
 * n'importe qui peut les appeler.
 */
export async function requireAdmin() {
  const store = await cookies();
  const admin = await getAdminFromTokens(
    store.get(AUTH_COOKIES.access)?.value,
    store.get(AUTH_COOKIES.refresh)?.value,
  );
  if (!admin) throw new Error("Non autorisé");
  return admin;
}
