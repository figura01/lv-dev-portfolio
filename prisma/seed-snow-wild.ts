// Ajoute (ou met à jour) le projet Snow Wild en base.
// Lancement, une seule fois, depuis la racine du projet :
//   npm run seed:snow-wild
// Le script est idempotent : le relancer met simplement la fiche à jour.
// ⚠️ Il écrit dans la base pointée par DATABASE_URL (.env).
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Noms repris à l'identique de ceux déjà utilisés sur le site quand ils
// existent (« Next », « Shadcn », « Postgres »…) pour éviter les doublons.
const technologies = [
  "Next",
  "TypeScript",
  "Tailwind CSS",
  "Shadcn",
  "React Hook Form",
  "Zod",
  "GraphQL",
  "Apollo",
  "Express",
  "Postgres",
  "TypeORM",
  "Docker",
  "Docker Hub",
  "GitHub Actions",
  "Caddy",
  "Stripe",
  "Jest",
  "React Testing Library",
];

const description = [
  "Snow Wild permet de louer du matériel de ski en ligne : les clients composent leur panier et règlent directement sur le site grâce au paiement Stripe.",
  "Nous avons développé l'application à cinq, avec un front Next.js (App Router) qui communique avec une API GraphQL via Apollo. Le back-end Express s'appuie sur PostgreSQL et TypeORM. L'ensemble est conteneurisé avec Docker, avec trois environnements distincts : développement, staging et production. En production, Caddy gère le HTTPS.",
  "Nous avons mis en place une chaîne CI/CD avec GitHub Actions pour limiter les régressions : les tests (Jest et React Testing Library) tournent à chaque modification, puis les images Docker du front-end et du back-end sont publiées sur Docker Hub. Un webhook déclenché à la fin du build met ensuite à jour automatiquement les services sur le serveur.",
  "J'étais le lead technique de l'équipe. J'ai conçu le socle Docker Compose du projet : les services front-end, back-end, base PostgreSQL et pgAdmin, reliés par un réseau commun pour que les conteneurs communiquent entre eux. Toute l'équipe a ainsi disposé d'un environnement identique et fonctionnel dès le départ.",
  "J'ai proposé d'utiliser shadcn/ui plutôt qu'une bibliothèque plus lourde comme MUI : des composants simples à prendre en main et à personnaliser, qui ont permis à toute l'équipe d'avancer vite sur l'interface. Son composant de formulaire s'appuie sur React Hook Form et Zod, ce qui nous a donné une validation des saisies et une gestion des erreurs cohérentes dans toute l'application.",
  "J'ai développé l'espace d'administration et la sécurité de l'application. J'ai mis en place l'authentification par jetons JWT, avec un middleware qui vérifie la validité des jetons et des guards qui autorisent l'accès selon le rôle de l'utilisateur. J'ai aussi conçu le layout admin et les opérations CRUD sur les différents modèles de données.",
  "En parallèle, j'ai accompagné mes coéquipiers sur les sujets qu'on s'était répartis et organisé le travail de l'équipe sur Trello : découpage des tâches, répartition et suivi de l'avancement.",
].join("\n\n");

const project = {
  title: "Snow Wild — location de matériel de ski",
  excerpt:
    "Application web de location de matériel de ski, conçue en équipe de 5 pendant ma formation à la Wild Code School et présentée en soutenance pour le titre RNCP Concepteur Développeur d'Applications.",
  description,
  image: "/projects/snow-wild.webp",
  published: true,
  isFeatured: false,
  // Date de la vidéo de démo (septembre 2024). À ajuster si besoin.
  publishedAt: new Date("2024-09-15"),
  link_url: "",
  features: [
    "Socle Docker Compose : front-end, back-end, PostgreSQL, pgAdmin et réseau commun",
    "CI/CD avec GitHub Actions : tests automatisés, images publiées sur Docker Hub, déploiement par webhook",
    "Trois environnements : développement, staging et production",
    "Authentification JWT, middleware de vérification des jetons et guards par rôle",
    "Espace d'administration avec CRUD sur les modèles de données",
    "Paiement en ligne avec Stripe et panier persistant (localStorage)",
  ],
};

async function main() {
  const connectTechs = {
    connectOrCreate: technologies.map((name) => ({
      where: { name },
      create: { name },
    })),
  };

  const saved = await prisma.project.upsert({
    where: { slug: "snow-wild" },
    create: { ...project, slug: "snow-wild", technologies: connectTechs },
    update: { ...project, technologies: { set: [], ...connectTechs } },
    include: { technologies: { select: { name: true } } },
  });

  console.log(
    `✔ Projet « ${saved.title} » enregistré avec ${saved.technologies.length} technologies.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
