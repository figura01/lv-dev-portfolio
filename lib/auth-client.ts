import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { additionalFields } from "better-auth/plugins/additional-fields";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    inferAdditionalFields<typeof auth>(),
    additionalFields({
      user: {
        fields: {
          role: {
            type: "string",
            required: true,
          },
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
