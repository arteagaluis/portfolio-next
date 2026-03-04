"use client";

import { ReactNode, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Network, Cpu, Layers, Activity, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @types Hobby
 * Structured representation of a hobby for a Senior Engineer profile.
 */
type Hobby = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  highlight: string;
};

const iconMap: Record<string, ReactNode> = {
  systems: <Network className="w-6 h-6 stroke-[1.5]" />,
  ai: <Cpu className="w-6 h-6 stroke-[1.5]" />,
  craft: <Layers className="w-6 h-6 stroke-[1.5]" />,
  impact: <Activity className="w-6 h-6 stroke-[1.5]" />,
};

export default function HobbiesSection() {
  const t = useTranslations("hobbies");

  const items = useMemo(() => {
    const rawItems = t.raw("items") as Omit<Hobby, "icon">[];
    return rawItems.map((item) => ({
      ...item,
      icon: iconMap[item.id] || <Activity className="w-6 h-6 stroke-[1.5]" />,
    })) as Hobby[];
  }, [t]);

  return (
    <section
      id="hobbies"
      className="w-full py-20 md:py-32 flex justify-center overflow-hidden bg-background relative"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:sticky lg:top-32"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground leading-[1.1]">
                {t("title")}
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {t("description")}
            </p>
          </motion.div>

          {/* Grid Section */}
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((hobby, index) => (
              <HobbyCard key={hobby.id} hobby={hobby} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
      tabIndex={0}
      role="article"
      aria-labelledby={`hobby-title-${hobby.id}`}
    >
      <div
        className={cn(
          "h-full p-8 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all duration-500",
          "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5",
          "hover:-translate-y-2 flex flex-col justify-between"
        )}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
              {hobby.icon}
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          <div className="space-y-3">
            <h3
              id={`hobby-title-${hobby.id}`}
              className="text-xl font-bold font-headline group-hover:text-primary transition-colors duration-500"
            >
              {hobby.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {hobby.description}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
            Focus Area
          </span>
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {hobby.highlight}
          </span>
        </div>

        {/* Subtle Animated Background Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
