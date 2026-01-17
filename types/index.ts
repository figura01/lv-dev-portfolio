export interface ITechnology {
  name: string;
  id: string;
}

export interface IProject {
  technologies: ITechnology[];
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  image: string;
  published: boolean;
  publishedAt: Date;
  isFeatured: boolean;
  features: string[];
  link_url: string;
  createdAt: Date;
  updatedAt: Date;
}
