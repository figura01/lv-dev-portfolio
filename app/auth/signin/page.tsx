"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/admin",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      toast.success("Successfully signed in!");
      router.push("/admin");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during sign in."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          We just need a few details to get you started.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`email`}>Email</Label>
              <Input
                id={`email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                name="email"
              />
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor={`password`}>Password</Label>
              <Input
                id={`password`}
                placeholder="Enter your password"
                type="password"
                required
                name="password"
              />
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          No account ?{" "}
          <Link className="text-indigo-500" href="/auth/signup">
            Sing Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
