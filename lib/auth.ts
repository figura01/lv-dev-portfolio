/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { DefaultSession, Session, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { JWT } from "@auth/core/jwt";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { cache } from "react";

// Configuration de Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Cache pour les requêtes utilisateur
export const getCachedUser = cache(async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      emailVerified: true,
    },
  });
});

// Déclaration des types étendus
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  }, // 30 days
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Récupérer l'utilisateur depuis la base de données
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toString() },
          });

          if (!user) {
            return null;
          }

          // Vérifier le mot de passe
          const isPasswordValid = await compare(
            credentials.password.toString(),
            user.password.toString()
          );

          if (!isPasswordValid) {
            return null;
          }

          // Retourner les informations de l'utilisateur
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id.toString() || "";
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

declare module "@auth/core/jwt" {
  interface JWT {
    role: string;
    id: string;
  }
}
