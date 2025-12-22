// lib/auth-config.ts
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
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
  user: {
    additionalFields: {
      role: {
        type: "string" as const, // Use 'enum' as const to match DBFieldType
        required: true,
        default: "USER",
        enum: ["USER", "ADMIN"],
      },
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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
    additionalFields: {
      user: {
        role: {
          type: "string" as const, // Use 'enum' as const to match DBFieldType
          required: true,
          default: "USER",
          enum: ["USER", "ADMIN"],
        },
      },
    },
  },
  plugins: [nextCookies()],
};

export const auth = betterAuth(authConfig);
