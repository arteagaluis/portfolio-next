"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

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
            <Button variant="outline" size="sm" asChild>
              <a
                href="/cv.pdf"
                download
                onClick={() => trackEvent({
                  action: 'cv_download',
                  category: 'Conversion',
                  label: 'footer_cv_download',
                })}
              >
                Download CV
              </a>
            </Button>
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
