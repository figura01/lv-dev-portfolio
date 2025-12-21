import ExperienceForm from "@/components/admin/experience/experience-form";
import { getExperienceById } from "@/lib/actions/experience.actions";
const AdminEditExperiencePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const { data: experience, success } = await getExperienceById(id);

  if (!success || !experience) {
    return <div>Experience not found</div>; // or redirect/error handling
  }
  return (
    <ExperienceForm type="Update" experienceId={id} experience={experience} />
  );
};

export default AdminEditExperiencePage;
