import { ProjectCard, type Project } from "@/components/project-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Project One",
      description:
        "A brief description of the first project, highlighting its key features and purpose.",
      tags: ["React", "Next.js", "Tailwind CSS"],
      image: PlaceHolderImages.find((p) => p.id === "project-1")!,
      externalUrl:
        "https://servicios.porvenir.com.co/cdc/front/cesantias/habeas-data/home",
    },
    {
      title: "Project Two",
      description:
        "An overview of the second project, focusing on the technologies used and problems solved.",
      tags: ["TypeScript", "Node.js", "PostgreSQL"],
      image: PlaceHolderImages.find((p) => p.id === "project-2")!,
      externalUrl:
        "https://servicios.porvenir.com.co/cdc/front/habeasdata/habeas-data-pi",
    },
    {
      title: "Project Three",
      description:
        "Details about the third project, showcasing complex functionalities and design patterns.",
      tags: ["GraphQL", "Apollo", "Prisma"],
      image: PlaceHolderImages.find((p) => p.id === "project-3")!,
      externalUrl:
        "https://servicios.porvenir.com.co/cdc/front/cesantias/autogestionado/validacion-viabilidad",
    },
    {
      title: "Project Four",
      description:
        "This project demonstrates expertise in building scalable and maintainable applications.",
      tags: ["Vue.js", "Nuxt.js", "Firebase"],
      image: PlaceHolderImages.find((p) => p.id === "project-4")!,
      externalUrl:
        "https://servicios.porvenir.com.co/evd-aut-afiliacion-traslado-pension/validacion-identidad",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            My Projects
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
