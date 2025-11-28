import { Button } from '@/components/ui/button';
import {Link} from '@/navigation';
import {useTranslations} from 'next-intl';
import { TypingAnimation } from '@/components/typing-animation';

export function HeroSection() {
  const t = useTranslations('HeroSection');
  
  const animatedWords = [
    t('animated-word-1'),
    t('animated-word-2'),
    t('animated-word-3'),
    t('animated-word-4'),
  ];

  return (
    <section id="home" className="w-full bg-secondary">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center min-h-dvh pt-24 pb-12">
          <div className="space-y-4">
            <h1 className="font-bold tracking-tighter font-headline text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">
              {t('title-start')} <TypingAnimation words={animatedWords} /> {t('title-end')}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
          <Button asChild className="px-6 py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 text-base rounded-md">
            <Link href="#projects">{t('button')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
