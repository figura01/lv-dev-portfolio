"use server";

import React from "react";
import { Resend } from "resend";

import { formContactSchema } from "@/lib/validators";
import { GithubAccessTokenEmail as EmailTemplate } from "@/components/email/template-mail";
import { z } from "zod";
const SENDER_EMAIL =
  (process.env.SEND_EMAIL as string) || "onboarding@resend.dev";
const resend = new Resend(process.env.SENDINBLUE_API_KEY);

export async function sendContactMail(data: z.infer<typeof formContactSchema>) {
  try {
    const response = await resend.emails.send({
      from: "figura.graphik@gmail.com",
      to: data.email,
      subject: data.subject,
      react: React.createElement(EmailTemplate, {
        data: {
          username: data.name,
          subject: data.subject,
          message: data.message,
          from: data.email,
          to: SENDER_EMAIL,
        },
      }),
    });
    console.log("response: ", response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
