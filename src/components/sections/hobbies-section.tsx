"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function HobbiesSection() {
  const t = useTranslations("hobbies");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: string[] = t.raw("items");

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="hobbies"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="space-y-8 max-w-5xl w-full">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-[700px]">
              {t("description")}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <li
                  key={index}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleItem(index);
                    }
                  }}
                  className={`group cursor-pointer rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 ease-in-out
                    border-border/60
                    hover:border-primary/30 hover:shadow-md hover:-translate-y-1
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${
                      isActive
                        ? "border-primary/40 shadow-md -translate-y-1"
                        : ""
                    }`}
                >
                  <div className="transition-all duration-300 ease-in-out">
                    {item}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
