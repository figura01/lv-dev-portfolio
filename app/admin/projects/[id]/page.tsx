import { getOneProjectById } from "@/lib/actions/project.actions";
import { getAllTechnology } from "@/lib/actions/technology.actions";
import ProjectForm from "@/components/admin/project/project-form";

const AdminEditProjectPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const { data: project } = await getOneProjectById(id);
  const { data: technologies } = await getAllTechnology();

  const transformedProject = project
    ? {
        ...project,
        technologies: project.technologies.map((tech) => tech.id),
      }
    : undefined;

  return (
    <>
      Edite Project
      <ProjectForm
        type="Update"
        technologies={technologies}
        project={transformedProject}
        projectId={id}
      />
    </>
  );
};

export default AdminEditProjectPage;
