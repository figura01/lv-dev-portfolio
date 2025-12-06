// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonction utilitaire pour formater les dates
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Fonction pour générer un dégradé de couleurs
export function generateGradient(id: string) {
  const colors = [
    "from-blue-500 to-cyan-400",
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-amber-500 to-yellow-400",
    "from-emerald-500 to-teal-400",
    "from-red-500 to-orange-500",
  ];

  // Générer un index basé sur l'ID fourni
  const index =
    id
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % colors.length;

  return colors[index];
}

// Con vert prisma object to regular object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (
    error.name === "ZodError" &&
    error.errors &&
    error.errors !== "undefinded" &&
    error.errors !== null
  ) {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors)
      .map((field) => error.errors[field].message)
      .join(". ");

    return fieldErrors;
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
