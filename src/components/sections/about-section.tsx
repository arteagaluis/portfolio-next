import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("AboutSection");
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-me");

  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
    >
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={t("imageAlt")}
                width={400}
                height={400}
                className="rounded-full object-cover aspect-square border-4 border-primary/10 shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              {t("title")}
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              {t("paragraph2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
