import fs from "node:fs";
import path from "node:path";

// Dépose ton CV ici pour activer automatiquement les boutons « Télécharger le CV » :
// public/cv-laurent-vuillaume.pdf
export const CV_URL = "/cv-laurent-vuillaume.pdf";

export function hasCv() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", CV_URL));
  } catch {
    return false;
  }
}

type Social = { name: string; linkUrl: string };

export function findSocial(list: Social[], name: "linkedin" | "github") {
  return list.find((item) => item.name.toLowerCase().includes(name))?.linkUrl;
}
