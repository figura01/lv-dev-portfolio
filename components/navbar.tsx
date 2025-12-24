// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/hooks/useSession";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navItems = [
  { name: "Accueil", path: "/" },
  { name: "Projets", path: "/projects" },
  // { name: "Services", path: "/services" },
  { name: "À Propos", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  // const isClient = useIsClient();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const { user } = useSession();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, [setTheme]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    typeof window !== "undefined" && (
      <div className={cn(`sticky top-0 z-50 w-full border-b bg-background/95`)}>
        <div className="flex h-16 items-center justify-between mx-8">
          <Button asChild variant="ghost" className="p-0">
            <Link href="/" className="flex item-center justify-center m-0 p-0">
              Portfolio
            </Link>
          </Button>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                  pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/60 hover:bg-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Basculer le thème</span>
            </Button>

            {/* Bouton menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Basculer le menu</span>
            </Button>
            {user ? (
              <>
                <Button asChild>
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    logout({
                      onSuccess: () => {
                        toast.success("Déconnecté avec succès !");
                        router.push("/");
                        router.refresh();
                      },
                      onError: () => {
                        toast.error(
                          "Échec de la déconnexion. Veuillez réessayer."
                        );
                      },
                    })
                  }
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Connexion</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-2">
              <nav className="flex flex-col space-y-1 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md",
                      pathname === item.path
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/60 hover:bg-accent"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Button asChild>
                      <Link href="/admin">Admin</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        logout({
                          onSuccess: () => {
                            toast.success("Déconnecté avec succès !");
                            router.push("/");
                          },
                          onError: () => {
                            toast.error(
                              "Échec de la déconnexion. Veuillez réessayer."
                            );
                          },
                        })
                      }
                    >
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                    <Link href="/auth/login">Connexion</Link>
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    )
  );
}
