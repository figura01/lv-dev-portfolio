import { signAccessToken, signRefreshToken } from "@/lib/auth/tokens";
import { accessCookie, refreshCookie, roleCookie } from "@/lib/auth/cookies";
import { getOneUserByEmail } from "@/lib/actions/user.actions";
import type { UserSession } from "@/lib/auth/types";
import bcrypt from "bcryptjs";

// Même réponse que l'e-mail existe ou non, pour ne pas révéler quels comptes existent.
const INVALID = () =>
  Response.json({ error: "Identifiants incorrects" }, { status: 401 });

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || typeof password !== "string") {
    return INVALID();
  }

  const { data: user } = await getOneUserByEmail(email);
  if (!user || !user.password) return INVALID();

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return INVALID();

  // Uniquement id, e-mail et rôle : jamais le hash du mot de passe.
  const loggedUser: UserSession = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const access = await signAccessToken(loggedUser);
  const refresh = await signRefreshToken(loggedUser);

  const res = Response.json({ loggedUser, message: "Connecté avec succès" });
  res.headers.append("Set-Cookie", accessCookie(access));
  res.headers.append("Set-Cookie", refreshCookie(refresh));
  res.headers.append("Set-Cookie", roleCookie(loggedUser.role));

  return res;
}
