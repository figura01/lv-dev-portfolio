import ProjectCard from "@/components/project-card";
import { IProject } from "@/types";

// Conservé pour compatibilité : la page d'accueil utilise désormais la même card que /projects.
const PreviewProjectCard = ({
  project,
  index = 0,
}: {
  project: IProject;
  index?: number;
}) => <ProjectCard project={project} index={index} />;

export default PreviewProjectCard;
