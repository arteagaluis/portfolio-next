"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-8 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {year} Luis Arteaga. All rights reserved.
          </p>
          <div className="flex items-center gap-2 sm:gap-4">
            <CVDownloadButton />

            <div className="flex gap-1">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com"
                  onClick={() => trackEvent({
                    action: 'contact_click',
                    category: 'Engagement',
                    label: 'github',
                    params: { method: 'github' }
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com"
                  onClick={() => trackEvent({
                    action: 'contact_click',
                    category: 'Engagement',
                    label: 'linkedin',
                    params: { method: 'linkedin' }
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  onClick={() => trackEvent({
                    action: 'contact_click',
                    category: 'Engagement',
                    label: 'twitter',
                    params: { method: 'twitter' }
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CVDownloadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsLoading(true);
    trackEvent({
      action: 'cv_download',
      category: 'Conversion',
      label: `footer_cv_start_${locale}`,
    });

    try {
      const response = await fetch(`/api/cv?locale=${locale}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to generate CV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Luis_Arteaga_CV_${locale.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      trackEvent({
        action: 'cv_download',
        category: 'Conversion',
        label: `footer_cv_success_${locale}`,
      });

      toast({
        title: locale === 'es' ? "Éxito" : "Success",
        description: locale === 'es' ? "Tu CV se ha descargado correctamente." : "Your CV has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error("Download error:", error);
      trackEvent({
        action: 'cv_download',
        category: 'Conversion',
        label: `footer_cv_error_${locale}`,
      });
      toast({
        variant: "destructive",
        title: locale === 'es' ? "Error" : "Error",
        description: locale === 'es'
          ? "Hubo un problema al generar el CV. Por favor, intenta de nuevo."
          : "There was a problem generating the CV. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isLoading}
      className="gap-2 min-w-[140px]"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {locale === 'es' ? "Generando..." : "Generating..."}
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          {locale === 'es' ? "Descargar CV" : "Download CV"}
        </>
      )}
    </Button>
  );
}
