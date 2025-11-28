import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: ImagePlaceholder;
};

export function ProjectCard({ project }: { project: Project }) {
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
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
