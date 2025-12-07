import { Project, Technology } from "@prisma/client";

// Type pour la réponse de l'API de création/mise à jour
export type ProjectApiResponse = {
  success: boolean;
  data?: Project;
  error?: string;
};

// Type pour la pagination
export type PaginationParams = {
  page?: number;
  limit?: number;
};

// Type pour la réponse paginée
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Type pour les données de la liste des projets
export type ProjectListData = Pick<
  Project,
  "id" | "title" | "slug" | "image" | "published" | "isFeatured" | "createdAt"
> & {
  technologies: Pick<Technology, "id" | "name">[];
};

export interface TechnologyFormProps {
  initialData?: Technology;
  type: "create" | "update";
  technologyId?: string;
}

export type ProjectCardType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  createdAt: Date;
  technologies: Technology[];
  // Only include fields that are actually needed by the card
};
