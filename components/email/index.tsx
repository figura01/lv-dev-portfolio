import { Resend } from "resend";

import { GithubAccessTokenEmail } from "@/components/email/template-mail";

const resend = new Resend(process.env.RESEND_API_KEY as string);
export const sendPurchaseReceipt = async ({
  data,
}: {
  data: {
    email: string;
    subject: string;
    username: string;
    message: string;
    from: string;
  };
}) => {
  await resend.emails.send({
    from: `contact@${process.env.NEXT_PUBLIC_DOMAIN_NAME}`,
    to: data.email,
    subject: `Order confirmation ${data.subject}`,
    react: <GithubAccessTokenEmail data={{ ...data, to: data.email }} />,
  });
};
