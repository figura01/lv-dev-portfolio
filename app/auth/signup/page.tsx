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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    authClient.signUp.email(
      {
        email,
        name,
        role,
        password,
        callbackURL: "/admin",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/admin");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            We just need a few details to get you started.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="hidden" name="role" value="USER" />
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`name`}>Full name</Label>
                <Input
                  id={`name`}
                  placeholder="Matt Welsh"
                  type="text"
                  required
                  name="name"
                />
              </div>
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
              Sign up
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-xs">
            Already have an account?{" "}
            <Link className="text-indigo-500" href="/auth/signin">
              Sing In.
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
