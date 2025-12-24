import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export type Session = {
  user: {
    id: string;
    email: string;
  };
  expiresAt: Date;
};

export async function signToken(user: Session["user"]) {
  return await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getSession(): Promise<Session | null> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      user: payload.user as Session["user"],
      expiresAt: new Date((payload.exp as number) * 1000),
    };
  } catch {
    return null;
  }
}
