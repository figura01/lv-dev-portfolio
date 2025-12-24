import { cookies } from "next/headers";
import { AUTH_COOKIES } from "./config";
import { verifyToken } from "./tokens";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(AUTH_COOKIES.access)?.value;
  if (!token) return null;

  const payload = await verifyToken<{ user: Session["user"]; exp: number }>(
    token
  );
  if (!payload) return null;

  return {
    user: payload.user,
    expiresAt: new Date(payload.exp * 1000),
  };
}
