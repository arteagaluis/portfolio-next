"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import {
  Code2, Cpu, Database, Globe, Layers, Server,
  Terminal, Calendar, Building2, Briefcase, Zap,
  ChevronRight, CircuitBoard
} from "lucide-react";
import { cn } from "@/lib/utils";

type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
  "Spring Boot": Zap,
};

export function ExperienceSection() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences: Experience[] = useMemo(() => {
    const roleKeys = ["techNova", "dataForge", "cloudWorks"] as const;
    return roleKeys.map((key) => {
      const period = t(`roles.${key}.period`) || "";
      const [start, end] = period.includes(" — ") ? period.split(" — ") : [period, ""];
      return {
        id: key,
        company: t(`roles.${key}.company`) || "",
        role: t(`roles.${key}.role`) || "",
        start,
        end,
        description: t(`roles.${key}.description`) || "",
        achievements: [
          t(`roles.${key}.achievements.1`),
          t(`roles.${key}.achievements.2`),
          t(`roles.${key}.achievements.3`),
        ].filter(Boolean),
        technologies: (t(`roles.${key}.technologies`) || "").split(", ").map(tech => tech.trim()).filter(Boolean),
      };
    });
  }, [t]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-background/50 overflow-hidden"
    >
      {!isMounted ? (
        <div className="container px-4 text-center">
          <h2 className="text-4xl font-headline font-black mb-4 opacity-50">{t("title")}</h2>
          <div className="h-1.5 w-24 bg-primary/20 mx-auto rounded-full" />
        </div>
      ) : (
        <>
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-full bg-[grid-linear-gradient(to_right,#80808012_1px,transparent_1px),grid-linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary/80 bg-primary/5">
                  <Terminal className="w-3 h-3 mr-2" />
                  history.sh
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-headline mb-4">
                  {t("title")}
                </h2>
                <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
                <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
                  {t("subtitle")}
                </p>
              </motion.div>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Animated Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-muted/30 -translate-x-1/2">
                <motion.div
                  style={{ scaleY }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-accent to-primary origin-top shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                />
              </div>

              <div className="space-y-24">
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    experience={exp}
                    index={index}
                    isLast={index === experiences.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function TimelineItem({ experience, index, isLast }: { experience: Experience; index: number; isLast: boolean }) {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0",
      isEven ? "md:flex-row-reverse" : ""
    )}>
      {/* Timeline Bullet */}
      <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 w-8 h-8 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </motion.div>
      </div>

      {/* Date Tag (Desktop) */}
      <div className={cn(
        "hidden md:flex flex-col w-[45%] items-center",
        isEven ? "items-end text-right pr-12" : "items-start text-left pl-12"
      )}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-muted/30 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 flex items-center gap-3"
        >
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm font-code font-bold text-muted-foreground whitespace-nowrap">
            {experience.start} — {experience.end}
          </span>
        </motion.div>
      </div>

      {/* Experience Card */}
      <div className="w-full md:w-[45%] pl-12 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        >
          <div className="group relative bg-card/40 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-2xl hover:border-primary/50 transition-colors duration-500 shadow-sm hover:shadow-primary/5 overflow-hidden">
            {/* Holographic accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border/40 bg-muted/20 p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:border-primary/40 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                  <Building2 className="w-7 h-7 text-primary/80 group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black font-headline tracking-tight group-hover:text-primary transition-colors">
                    {experience.company}
                  </h3>
                  <div className="flex items-center gap-2 text-primary font-code text-sm mt-1 uppercase tracking-widest font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    {experience.role}
                  </div>
                  {/* Date (Mobile Only) */}
                  <div className="flex md:hidden items-center gap-2 text-muted-foreground text-xs mt-2 font-code">
                    <Calendar className="w-3 h-3" />
                    {experience.start} — {experience.end}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />
                <p className="pl-5 text-muted-foreground leading-relaxed text-base italic group-hover:not-italic transition-all duration-300">
                  {experience.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter text-muted-foreground/60 font-bold">
                  <Zap className="w-3 h-3" />
                  Key Achievements
                </div>
                <ul className="space-y-3">
                  {experience.achievements.map((ach, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-3 text-sm text-foreground/80 group/ach"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover/ach:translate-x-1 transition-transform" />
                      <span>{ach}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                {experience.technologies.map((tech) => {
                  const Icon = techIconMap[tech] ?? CircuitBoard;
                  return (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-muted text-[10px] font-code py-0.5 px-2 border border-transparent hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300 flex items-center gap-1.5"
                    >
                      <Icon className="w-3 h-3" />
                      {tech}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Corner decorator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-lg group-hover:border-primary/60 transition-colors duration-500" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
