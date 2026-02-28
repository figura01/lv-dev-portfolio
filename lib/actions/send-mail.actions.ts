"use server";

import React from "react";
import { Resend } from "resend";

import { formContactSchema } from "@/lib/validators";
import { ContactEmail as EmailTemplate } from "@/components/email/template-mail";
import { z } from "zod";
const SENDER_EMAIL =
  (process.env.SENDER_EMAIL as string) || "onboarding@resend.dev";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMail(
  { name, email, message }: z.infer<typeof formContactSchema>,
) {
  try {
    const response = await resend.emails.send({
      from: "figura.graphik@gmail.com",
      to: email,
      subject: "Contact Form Submission",
      react: React.createElement(EmailTemplate, {
        name: name,
        subject: "Contact Form Submission",
        message: message,
        from: email,
        to: SENDER_EMAIL,
      }),
    });
    console.log("response: ", response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
