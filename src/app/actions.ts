"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function submitContactForm(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
      success: false,
    };
  }

  // Simulate sending an email
  console.log("Form data submitted:", validatedFields.data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send an email here.
  // For example, using a service like Resend, SendGrid, or Nodemailer.

  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
  };
}
