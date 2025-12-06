import TechnologyForm from "@/components/admin/technologies/technology-form";
import { getTechnologyById } from "@/lib/actions/technology.actions";
import { notFound } from "next/navigation";

const UpdateTechnologyPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const technology = await getTechnologyById(id);

  if (!technology) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Editer La Technologie</h1>
      <TechnologyForm type="update" technology={technology} technologyId={id} />
    </div>
  );
};

export default UpdateTechnologyPage;
