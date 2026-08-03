import {
  Code2,
  Settings2,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export const services: Service[] = [
  {
    title: "Développement web",
    description:
      "Création de sites et d’applications web modernes, performants et adaptés à vos objectifs.",
    icon: Code2,
    features: [
      "Sites vitrines",
      "Applications web",
      "Plateformes SaaS",
      "Espaces d’administration",
      "Optimisation des performances",
      "Référencement technique",
    ],
  },
  {
    title: "Applications mobiles",
    description:
      "Développement d’applications mobiles fluides et intuitives pour iOS et Android.",
    icon: Smartphone,
    features: [
      "Applications métier",
      "Applications communautaires",
      "Outils internes",
      "Applications de réservation",
      "MVP pour startup",
      "Déploiement mobile",
    ],
  },
  {
    title: "Développement sur mesure",
    description:
      "Conception de solutions personnalisées pour répondre précisément aux besoins de votre activité.",
    icon: Settings2,
    features: [
      "Logiciels internes",
      "Automatisation de processus",
      "Portails clients",
      "Outils de gestion",
      "Intégrations API",
      "Interfaces personnalisées",
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Découverte",
    description:
      "Nous échangeons sur votre projet, vos objectifs et vos contraintes.",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Je définis l’architecture, les fonctionnalités et l’expérience utilisateur.",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Je développe la solution avec des technologies modernes et maintenables.",
  },
  {
    number: "04",
    title: "Mise en ligne",
    description:
      "Je déploie le projet et vous accompagne dans sa prise en main.",
  },
];