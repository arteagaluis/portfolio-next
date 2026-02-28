"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const t = useTranslations("contact");
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: ContactFormValues) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const result = await submitContactForm(null, formData);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: result.message || "An unexpected error occurred.",
      });

      if (result.errors) {
        if (result.errors.name)
          form.setError("name", {
            type: "server",
            message: result.errors.name[0],
          });
        if (result.errors.email)
          form.setError("email", {
            type: "server",
            message: result.errors.email[0],
          });
        if (result.errors.message)
          form.setError("message", {
            type: "server",
            message: result.errors.message[0],
          });
      }
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("subtitle")}
          </p>
        </div>
        <div className="mx-auto w-full max-w-md space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("namePlaceholder")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("emailPlaceholder")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("emailPlaceholder")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("messagePlaceholder")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("messagePlaceholder")}
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? t("submittingButton") : t("submitButton")}
              </Button>
            </form>
          </Form>
          <div className="text-center text-muted-foreground">
            <p>{t("orDirectly")}</p>
            <a
              href={`mailto:${t("emailAddress")}`}
              className="font-medium text-primary hover:underline flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {t("emailAddress")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
