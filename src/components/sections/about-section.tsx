import Image from "next/image";
import { useTranslations } from "next-intl";
import { techStack } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Terminal,
  Server,
  Database,
  Zap,
  ShieldCheck,
  Layout,
  Cpu
} from "lucide-react";

const skillIcons: Record<string, any> = {
  frontend: Code2,
  typescript: Terminal,
  backend: Server,
  database: Database,
  devops: Zap,
  testing: ShieldCheck,
  uiux: Layout,
  ai: Cpu,
};

export function AboutSection() {
  const t = useTranslations("about");
  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <Image
              src="/img/carnet.jpg"
              alt={t("imageAlt")}
              width={400}
              height={400}
              className="rounded-full object-cover aspect-square border-4 border-primary/10 shadow-lg"
            />
          </div>
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("title")}
              </h2>
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed leading-relaxed">
                {t("intro")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground/90 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  {t("skillsTitle")}
                </h3>
                <ul className="space-y-4">
                  {["frontend", "typescript", "backend", "database", "devops", "testing", "uiux", "ai"].map((skillKey) => {
                    const Icon = skillIcons[skillKey];
                    return (
                      <li key={skillKey} className="group flex flex-col gap-1">
                        <div className="flex items-center gap-3 text-foreground font-semibold">
                          <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span>{t(`skills.${skillKey}`).split(":")[0]}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-7">
                          {t(`skills.${skillKey}`).split(":")[1]}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground/90 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  {t("skillsTitle")}
                </h3>
                <div className="space-y-4">
                  {(Object.keys(techStack) as Array<keyof typeof techStack>).map((category) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techStack[category].map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
