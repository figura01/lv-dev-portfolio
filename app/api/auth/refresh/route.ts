import { cookies } from "next/headers";
import { signAccessToken, getUserFromTokens } from "@/lib/auth/tokens";
import { accessCookie } from "@/lib/auth/cookies";
import { AUTH_COOKIES } from "@/lib/auth/config";

export async function POST() {
  const store = await cookies();
  // Seul un jeton de rafraîchissement valide (signature + expiration) permet
  // d'obtenir un nouveau jeton d'accès.
  const result = await getUserFromTokens(
    undefined,
    store.get(AUTH_COOKIES.refresh)?.value,
  );
  if (!result) return new Response("Unauthorized", { status: 401 });

  const access = await signAccessToken(result.user);
  const res = new Response(null, { status: 204 });
  res.headers.append("Set-Cookie", accessCookie(access));
  return res;
}
