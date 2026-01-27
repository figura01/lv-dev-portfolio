import SocialMediaForm from "@/components/admin/social-media/social-media-form";

const CreateSocailMediaPage = () => {
  return (
    <div className="container max-w-auto mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nouveau Social Media</h1>
      <SocialMediaForm type="Create" />
    </div>
  );
};

export default CreateSocailMediaPage;
