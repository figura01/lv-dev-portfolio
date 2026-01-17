// import { z } from "zod"

// Technology

export const technologyFormDefaultValues = {
  name: "",
};

export const projectFormDefaultValues = {
  title: "",
  slug: "",
  description: "",
  excerpt: "",
  image: "",
  published: false,
  publishedAt: new Date(),
  isFeatured: false,
  features: [],
  technologies: [],
  link_url: "",
};

export const experienceFormDefaultValues = {
  title: "",
  company: "",
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  role: "",
  status: "",
};
