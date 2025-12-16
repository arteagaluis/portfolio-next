"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from "@/lib/placeholder-images";
import { useTranslations } from "next-intl";
import { Code2, Cpu, Database, Globe, Layers, Server } from "lucide-react";

type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: ImagePlaceholder;
};

const techIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  React: Code2,
  "Next.js": Layers,
  TypeScript: Code2,
  Node: Server,
  "Node.js": Server,
  PostgreSQL: Database,
  GraphQL: Globe,
  Prisma: Database,
  Apollo: Globe,
  Firebase: Server,
  "Tailwind CSS": Layers,
  Vue: Code2,
  "Vue.js": Code2,
};

export function ExperienceSection() {
  const t = useTranslations("ExperienceSection");
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: Experience[] = useMemo(
    () => [
      {
        company: "TechNova",
        role: "Senior Full‑Stack Developer",
        start: "01/2022",
        end: "Presente",
        description:
          "Lideré el desarrollo de funcionalidades core y optimicé el rendimiento del frontend en una plataforma SaaS.",
        achievements: [
          "Reduje el TTI en 35% mediante optimización de bundles y caché",
          "Implementé CI/CD con despliegues automáticos y feature flags",
          "Mentoricé al equipo en prácticas de accesibilidad (WCAG 2.1 AA)",
        ],
        technologies: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
        ],
        logo: PlaceHolderImages.find((p) => p.id === "project-6"),
      },
      {
        company: "DataForge",
        role: "Frontend Engineer",
        start: "06/2020",
        end: "12/2021",
        description:
          "Construí interfaces interactivas de análisis de datos y mejoré la experiencia de usuario con micro‑interacciones.",
        achievements: [
          "Diseñé componentes reutilizables y accesibles",
          "Introduje pruebas de usabilidad y mejoras de UX",
          "Migré estilos a un sistema utilitario con Tailwind CSS",
        ],
        technologies: ["React", "TypeScript", "GraphQL", "Apollo", "Prisma"],
        logo: PlaceHolderImages.find((p) => p.id === "project-3"),
      },
      {
        company: "CloudWorks",
        role: "Full‑Stack Developer",
        start: "02/2018",
        end: "05/2020",
        description:
          "Desarrollé aplicaciones escalables y servicios backend, integrando autenticación y almacenamiento en la nube.",
        achievements: [
          "Creé APIs REST robustas con validación y logging",
          "Implementé SSR y optimización de imágenes",
          "Mejoré la observabilidad con métricas y trazas",
        ],
        technologies: ["Vue.js", "Node.js", "Firebase", "PostgreSQL"],
        logo: PlaceHolderImages.find((p) => p.id === "project-4"),
      },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setSelectedIndex(idx);
      const p = api.scrollProgress();
      setProgress(p);
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
      aria-labelledby="experience-title"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2
            id="experience-title"
            className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline"
          >
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
              aria-hidden="true"
            />
            <span className="sr-only">
              Progreso de línea de tiempo: {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            {experiences.map((exp, i) => (
              <button
                key={exp.company + i}
                type="button"
                className={`relative inline-flex items-center justify-center rounded-full border bg-background px-3 py-1 text-xs font-medium transition-all
                ${
                  selectedIndex === i
                    ? "border-primary text-primary shadow"
                    : "border-border text-muted-foreground"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none`}
                onClick={() => api?.scrollTo(i)}
                aria-current={selectedIndex === i ? "step" : undefined}
                aria-label={`${exp.company} · ${exp.start} – ${exp.end}`}
              >
                {exp.company}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Carousel
            opts={{ loop: false, dragFree: true }}
            setApi={setApi}
            className="w-full overflow-hidden"
            aria-label={t("carouselAria")}
          >
            <CarouselContent>
              {experiences.map((exp, index) => (
                <CarouselItem
                  key={exp.company + index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`group h-full transition-all duration-500 ease-out motion-reduce:transition-none
                    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] will-change-transform`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "none" : "translateY(12px)",
                      transitionDelay: mounted ? `${index * 120}ms` : "0ms",
                    }}
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      {exp.logo && (
                        <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden border border-border/40">
                          <Image
                            src={exp.logo.imageUrl}
                            alt={exp.company}
                            fill
                            sizes="48px"
                            className="object-cover"
                            data-ai-hint={exp.logo.imageHint}
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <CardTitle className="text-xl font-headline">
                          {exp.company}
                        </CardTitle>
                        <CardDescription className="mt-0.5">
                          {exp.role}
                        </CardDescription>
                        <div
                          className="text-xs text-muted-foreground mt-1"
                          aria-label="Periodo de empleo"
                        >
                          {exp.start} — {exp.end}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="text-sm">
                            • {ach}
                          </li>
                        ))}
                      </ul>
                      <div
                        className="mt-4 flex flex-wrap gap-2"
                        aria-label="Tecnologías utilizadas"
                      >
                        <TooltipProvider>
                          {exp.technologies.map((tech) => {
                            const Icon = techIconMap[tech] ?? Cpu;
                            return (
                              <Tooltip key={tech}>
                                <TooltipTrigger asChild>
                                  <Badge
                                    variant="secondary"
                                    className="inline-flex items-center gap-1.5 px-3 py-1 motion-reduce:transition-none"
                                  >
                                    <Icon className="h-3.5 w-3.5" />
                                    <span className="text-xs">{tech}</span>
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>{tech}</TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="motion-reduce:transition-none" />
            <CarouselNext className="motion-reduce:transition-none" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
