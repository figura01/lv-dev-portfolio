import { signAccessToken, signRefreshToken } from "@/lib/auth/tokens";
import { AUTH_COOKIES } from "@/lib/auth/config";
import { getOneUserByEmail } from "@/lib/actions/user.actions";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user } = await getOneUserByEmail(email);

  if (!user || !user.password) {
    return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return Response.json({ error: "Identifiant incorrect" }, { status: 401 });
  }

  // TODO Prisma + bcrypt
  // const user = { id: "1", email, role: "USER" as const };
  const loggedUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const access = await signAccessToken(user);
  const refresh = await signRefreshToken(user.id);

  const res = Response.json({ loggedUser, message: "Connecté avec succès" });

  res.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIES.access}=${access}; HttpOnly; Path=/`
  );
  res.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIES.refresh}=${refresh}; HttpOnly; Path=/`
  );
  res.headers.append(
    "Set-Cookie",
    `${AUTH_COOKIES.role}=${loggedUser.role}; Path=/`
  );

  return res;
}
