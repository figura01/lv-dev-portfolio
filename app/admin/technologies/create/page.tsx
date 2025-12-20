import TechnologyForm from "@/components/admin/technology/technology-form";

const CreateTechnologyPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nouvelle Technologie</h1>
      <TechnologyForm type="create" />
    </div>
  );
};

export default CreateTechnologyPage;
