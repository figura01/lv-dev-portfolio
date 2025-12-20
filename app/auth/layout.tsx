import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="max-w-md flex flex-col justify-center min-h-screen w-full mx-auto">
      {children}
    </div>
  );
}
