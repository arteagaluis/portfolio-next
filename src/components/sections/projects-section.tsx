import { useTranslations } from "next-intl";
import { ProjectCard, type Project } from "@/components/project-card";

export function ProjectsSection() {
  const t = useTranslations("projects");
  const projectKeys = ["project1", "project2", "project3", "project4"] as const;

  const projects: Project[] = projectKeys.map((key) => ({
    title: t(`list.${key}.title`),
    description: t(`list.${key}.problem`),
    impact: t(`list.${key}.impact`),
    tags: t(`list.${key}.technologies`).split(", ").map(tech => tech.trim()),
    ctaLabel: t(`list.${key}.cta`),
    image: {
      imageUrl: `/img/${key}.png`,
      id: key,
      description: t(`list.${key}.title`),
      imageHint: t(`list.${key}.title`),
    },
    externalUrl: t(`list.${key}.url`),
  }));

  return (
    <section
      id="projects"
      className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            {t("title")}
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
