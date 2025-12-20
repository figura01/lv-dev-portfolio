import ProjectForm from "../../../../components/admin/project/project-form";
import { getAllTechnology } from "@/lib/actions/technology.actions";

const AdminCreateProjctPage = async () => {
  const { data } = await getAllTechnology();
  return <ProjectForm technologies={data} type="Create" />;
};

export default AdminCreateProjctPage;
