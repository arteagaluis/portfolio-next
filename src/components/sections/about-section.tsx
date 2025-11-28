import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-me');

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt="About me"
                width={400}
                height={400}
                className="rounded-full object-cover aspect-square border-4 border-primary/10 shadow-lg"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              I am a dedicated software developer with a passion for creating beautiful and functional user interfaces. With a strong foundation in modern web technologies, I specialize in building responsive and performant applications using React, Next.js, and TypeScript.
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              My experience spans across front-end and back-end development, allowing me to build comprehensive solutions from scratch. I thrive in collaborative environments and am always eager to learn new skills and tackle challenging problems. When I'm not coding, I enjoy exploring new technologies and contributing to open-source projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
