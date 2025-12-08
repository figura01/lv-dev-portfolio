"use server";
import { signInFormSchema } from "@/lib/validators";
import { signIn, signOut } from "next-auth/react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "@/lib/utils";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    // Provide the required arguments to getRedirectError
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}
