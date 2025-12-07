"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="mt-8 space-y-6">
      <div>
        <button
          onClick={() => signIn("google")}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <FcGoogle className="h-5 w-5" />
          </span>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
