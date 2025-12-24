import { cookies } from "next/headers";
import { signAccessToken } from "@/lib/auth/tokens";
import { AUTH_COOKIES } from "@/lib/auth/config";

export async function POST() {
  const cookiesStore = await cookies();
  const refresh = cookiesStore.get(AUTH_COOKIES.refresh)?.value;
  if (!refresh) return new Response("Unauthorized", { status: 401 });

  // TODO verify refresh + fetch user
  const user = { id: "1", email: "test@test.com", role: "USER" as const };
  const access = await signAccessToken(user);

  const res = new Response(null, { status: 204 });
  res.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIES.access}=${access}; HttpOnly; Path=/`
  );
  return res;
}
