export const Footer = () => {
  return (
    <footer className="flex h-16 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © Votre Nom. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/mentions-legales"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Mentions Légales
            </a>
            <a
              href="/politique-de-confidentialite"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
