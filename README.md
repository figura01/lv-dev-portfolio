This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Configuration SEO

Le domaine public par défaut est `https://laurent-vuillaume.ovh`.
Pour le changer, définissez `NEXT_PUBLIC_SITE_URL` dans `.env` et dans
l’environnement de déploiement avec l’origine publique (HTTPS, sans chemin).
Relancez le build après toute modification de cette valeur.

Les cinq pages publiques principales possèdent des titres, descriptions et métadonnées
Open Graph/Twitter dédiés dans `lib/seo.ts` et leurs fichiers `page.tsx`.
`/sitemap.xml` et `/robots.txt` sont générés automatiquement et référencent
les cinq pages publiques principales. Après déploiement, soumettez `/sitemap.xml` dans
Google Search Console. Les pages de connexion et d’administration utilisent
`noindex` ; cette directive ne remplace pas le contrôle d’accès.

## Développement local

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
