import SocialMediaForm from "@/components/admin/social-media/social-media-form";
import { getSocialMediaById } from "@/lib/actions/social-media.actions";

const CreateSocailMediaPage = async (props: { id: string }) => {
  const socialMediaId = await props.id;
  const { data: socialMedia } = await getSocialMediaById(socialMediaId);

  if (!socialMedia) {
    return <div className="container mx-auto py-8">Social media not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nouvelle Technologie</h1>
      <SocialMediaForm
        type="Update"
        socialMedia={socialMedia}
        socialMediaId={socialMediaId}
      />
    </div>
  );
};

export default CreateSocailMediaPage;
