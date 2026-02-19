import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: ImagePlaceholder;
  externalUrl?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("ProjectsSection");

  const isValidExternalUrl =
    typeof project.externalUrl === "string" &&
    project.externalUrl.trim().length > 0 &&
    project.externalUrl.startsWith("https://");

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={project.image.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-5 lg:p-6">
        <CardTitle className="text-xl font-bold mb-2 font-headline">{project.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 min-h-[3rem]">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        {isValidExternalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("viewProject")}
          </a>
        )}
      </CardContent>
    </Card>
  );
}
