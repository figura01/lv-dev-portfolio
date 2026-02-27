import { Resend } from "resend";

import { ContactEmail } from "@/components/email/template-mail";

const resend = new Resend(process.env.RESEND_API_KEY as string);
export const sendContactEmail = async ({
  data,
}: {
  data: {
    email: string;
    subject: string;
    name: string;
    message: string;
    from: string;
  };
}) => {
  await resend.emails.send({
    from: `contact@${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
    to: data.email,
    subject: `Contact message from ${data.name}`,
    react: <ContactEmail {...data} to={data.email} />,
  });
};
