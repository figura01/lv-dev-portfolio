import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface IContactEmailProps {
  name: string;
  to: string;
  from: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  to,
  from,
  subject,
  message,
}: IContactEmailProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="bg-white text-[#24292e] font-github">
        <Preview>
          A fine-grained personal access token has been added to your account
        </Preview>
        <Container className="max-w-[480px] mx-auto my-0 pt-5 pb-12 px-0">
          <Text className="text-[24px] leading-[1.25]">
            <strong>@{name}</strong>, wrote a email, to: {to}
          </Text>

          <Section className="p-6 border border-solid border-[#dedede] rounded-[5px] text-center">
            <Text className="mb-[10px] mt-0 text-left">
              Email:<strong>{from}</strong>!
            </Text>
            <Button className="text-sm bg-[#28a745] text-white leading-normal rounded-lg py-3 px-6">
              Subject: {subject}
            </Button>
            <Text className="mb-[10px] mt-0 text-left">
              Message: <strong>{message}</strong>
            </Text>
          </Section>
          <Text className="text-center">
            <Link className="text-[#0366d6] text-[12px]">
              Your security audit log
            </Link>{" "}
            ・{" "}
            <Link className="text-[#0366d6] text-[12px]">Contact support</Link>
          </Text>

          <Text className="text-[#6a737d] text-xs leading-[24px] text-center mt-[60px] mb-4">
            GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactEmail;
