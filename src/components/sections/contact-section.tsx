"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { trackEvent } from "@/lib/analytics";

export function ContactSection() {
  const t = useTranslations("contact");
  const { toast } = useToast();

  const contactSchema = z.object({
    name: z.string().min(2, { message: t("errors.requiredName") }),
    email: z.string().email({ message: t("errors.invalidEmail") }),
    message: z.string().min(10, { message: t("errors.requiredMessage") }),
    honeypot: z.string().optional(),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        trackEvent({
          action: "contact_click",
          category: "Conversion",
          label: "contact_form_success",
          params: { method: "form" },
        });
        toast({
          title: t("successTitle"),
          description: t("successDescription"),
        });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: t("errorTitle"),
        description: t("errorDescription"),
      });
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
              {/* Honeypot field (hidden from users) */}
              <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden">
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave this field empty</FormLabel>
                      <FormControl>
                        <Input tabIndex={-1} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

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
              onClick={() => trackEvent({
                action: 'contact_click',
                category: 'Engagement',
                label: 'direct_email',
                params: { method: 'email' }
              })}
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
