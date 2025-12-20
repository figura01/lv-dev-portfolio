import ExperienceForm from "@/components/admin/experience/experience-form";

const AdminCreateExperiencePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Créer une Expérience</h1>
      {/* Formulaire de création d'expérience */}
      <ExperienceForm type="Create" />
    </div>
  );
};

export default AdminCreateExperiencePage;
