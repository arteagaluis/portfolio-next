import Image from "next/image";
import { useTranslations } from "next-intl";

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
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              {t("title")}
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              {t("intro")}
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground/90">{t("skillsTitle")}</h3>
              <ul className="space-y-3">
                {["frontend", "typescript", "backend", "database", "devops", "testing", "uiux", "ai"].map((skillKey) => (
                  <li key={skillKey} className="flex gap-3 text-muted-foreground md:text-base/relaxed">
                    <span className="mt-1 flex-shrink-0 text-primary">•</span>
                    <span>{t(`skills.${skillKey}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
