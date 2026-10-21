import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 md:px-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Laurent Vuillaume · LVDEV</p>
        <nav aria-label="Liens du pied de page" className="flex gap-6">
          <Link href="/projects" className="hover:text-foreground">
            Projets
          </Link>
          <Link href="/about" className="hover:text-foreground">
            À propos
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};
