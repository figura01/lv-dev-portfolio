import SocialMediaForm from "@/components/admin/social-media/social-media-form";
import { getSocialMediaById } from "@/lib/actions/social-media.actions";

const CreateSocailMediaPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const { data: socialMedia } = await getSocialMediaById(id);

  if (!socialMedia) {
    return <div className="container mx-auto py-8">Social media not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nouvelle Technologie</h1>
      <SocialMediaForm
        type="Update"
        socialMedia={socialMedia}
        socialMediaId={id}
      />
    </div>
  );
};

export default CreateSocailMediaPage;
