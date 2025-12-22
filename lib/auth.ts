import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_APP_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/signin",
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? "lv-dev-portfolio-pink.vercel.app"
            : "localhost",
      },
    },
  },
  session: {},
  plugins: [nextCookies()],
});
