export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "LVDEV";
export const technologiyDefaultValue = {
  name: "",
};

export const projectDefaultValues = {
  title: "",
  slug: "",
  description: "",
  excerpt: "",
  image: "",
  published: false,
  isFeatured: false,
  technologies: [] as string[],
  features: [] as string[],
  link_url: "",
};

export const signInDefaultValues = {
  email: "",
  password: "",
};
