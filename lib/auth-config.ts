// lib/auth-config.ts
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { additionalFields } from "better-auth/plugins/additional-fields";
import { env } from "process";
const isProduction = process.env.NODE_ENV === "production";
export const authConfig = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    db: {
      url: env.DATABASE_URL,
    },
  },
  cookies: {
    sessionToken: {
      name: `${isProduction ? "__Secure-" : ""}auth-session`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
        domain: isProduction ? "lv-dev-portfolio-pink.vercel.app" : "localhost",
      },
    },
  },
  session: {},
  plugins: [
    nextCookies(),
    additionalFields({
      user: {
        fields: {
          role: {
            type: "string",
            required: true,
            default: "USER",
          },
        },
      },
    }),
  ],
};
export const auth = betterAuth(authConfig);
