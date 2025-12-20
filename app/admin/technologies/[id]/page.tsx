import TechnologyForm from "@/components/admin/technology/technology-form";
import { notFound } from "next/navigation";
import { getTechnologyById } from "@/lib/actions/technology.actions";

const CreateTechnologyPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  console.log(id);
  const technology = await getTechnologyById(id);

  if (!technology) return notFound();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Editer La Technologie</h1>
      <TechnologyForm type="update" technologyId={id} technology={technology} />
    </div>
  );
};

export default CreateTechnologyPage;
