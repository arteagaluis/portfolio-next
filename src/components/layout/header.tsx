"use client";

import { useState, useEffect } from "react";
import { Code2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { LanguageToggle } from "../language-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#about", label: t("about") },
    { href: "#strategy", label: t("strategy") },
    { href: "#experience", label: t("experience") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out w-full flex justify-center",
        isScrolled ? "top-4" : "top-0"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 md:px-6 lg:px-8 transition-all duration-300 ease-in-out container",
          isScrolled
            ? "h-16 lg:h-16 rounded-xl border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
            : "h-16 lg:h-20"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base sm:text-lg shrink-0"
          onClick={() => setIsMenuOpen(false)}
        >
          <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="font-headline whitespace-nowrap">Luis Arteaga</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2 xl:px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6">
                <Link
                  href="/"
                  className="mb-8 flex items-center gap-2 font-bold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Code2 className="h-6 w-6 text-primary" />
                  <span className="font-headline">Luis Arteaga</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
