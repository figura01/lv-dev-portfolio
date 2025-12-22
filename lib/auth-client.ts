import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth-config";

const isProduction = process.env.NODE_ENV === "production";

export const authClient = createAuthClient({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_APP_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_APP_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
