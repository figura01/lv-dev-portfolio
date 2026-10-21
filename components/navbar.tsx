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
  { name: "À propos", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
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

  const handleLogout = () =>
    logout({
      onSuccess: () => {
        toast.success("Déconnecté avec succès !");
        router.push("/");
        router.refresh();
      },
      onError: () => {
        toast.error("Échec de la déconnexion. Veuillez réessayer.");
      },
    });

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    typeof window !== "undefined" && (
      <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-display text-base font-extrabold text-primary-foreground">
              LV
            </span>
            <span className="hidden font-semibold sm:inline">
              Laurent Vuillaume
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-1 rounded-full border bg-card p-1 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Basculer le thème</span>
            </Button>

            {user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className="hidden h-10 rounded-full px-5 font-semibold md:inline-flex"
              >
                <Link href="/contact">Me contacter</Link>
              </Button>
            )}

            {/* Bouton menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Basculer le menu</span>
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium",
                    isActive(item.path)
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent",
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href="/admin">Admin</Link>
                  </Button>
                  <Button variant="ghost" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Button asChild className="mt-2 h-11 rounded-xl">
                  <Link href="/contact">Me contacter</Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    )
  );
}
