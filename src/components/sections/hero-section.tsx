"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/typing-animation";
import { ArrowDown, Sparkles, Code2, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const t = useTranslations("hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const animatedWords = [
    t("animated-word-1"),
    t("animated-word-2"),
    t("animated-word-3"),
    t("animated-word-4"),
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D Relief effect with cursor
  useEffect(() => {
    const trailCanvas = trailCanvasRef.current;
    const section = sectionRef.current;
    if (!trailCanvas || !section) return;

    const ctx = trailCanvas.getContext("2d");
    if (!ctx) return;

    const resizeTrailCanvas = () => {
      const rect = section.getBoundingClientRect();
      trailCanvas.width = rect.width;
      trailCanvas.height = rect.height;
    };

    resizeTrailCanvas();

    let mouseX = 0;
    let mouseY = 0;
    let isInside = false;
    let lightX = 0;
    let lightY = 0;

    // Get all interactive elements with relief effect
    const getInteractiveElements = () => {
      return section.querySelectorAll(
        '.relief-element, button, a[href^="#"]'
      ) as NodeListOf<HTMLElement>;
    };

    const updateRelief = () => {
      // Smooth light position
      lightX += (mouseX - lightX) * 0.1;
      lightY += (mouseY - lightY) * 0.1;

      // Clear canvas
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

      if (isInside) {
        // Create radial gradient for light source
        const lightRadius = 300;
        const gradient = ctx.createRadialGradient(
          lightX,
          lightY,
          0,
          lightX,
          lightY,
          lightRadius
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.15)");
        gradient.addColorStop(0.5, "rgba(96, 165, 250, 0.08)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        // Draw light source
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

        // Update element elevations based on distance from light
        const elements = getInteractiveElements();
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();
          const elementX = rect.left + rect.width / 2 - sectionRect.left;
          const elementY = rect.top + rect.height / 2 - sectionRect.top;

          const dx = elementX - lightX;
          const dy = elementY - lightY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 400;
          const influence = Math.max(0, 1 - distance / maxDistance);

          // Calculate elevation (0 to 20px)
          const elevation = influence * 20;
          const rotationX = (dy / maxDistance) * 5;
          const rotationY = (dx / maxDistance) * -5;

          // Apply 3D transform
          element.style.transform = `perspective(1000px) translateZ(${elevation}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
          element.style.transition = "transform 0.1s ease-out";
          element.style.willChange = "transform";

          // Add shadow based on elevation
          const shadowIntensity = influence * 0.3;
          element.style.boxShadow = `
            ${dx * 0.1}px ${dy * 0.1}px ${elevation * 2}px rgba(0, 0, 0, ${shadowIntensity}),
            0 0 ${elevation}px rgba(59, 130, 246, ${influence * 0.2})
          `;
        });

        // Draw grid relief effect with depth
        const gridSize = 24;
        ctx.lineWidth = 0.5;

        for (let x = 0; x < trailCanvas.width; x += gridSize) {
          for (let y = 0; y < trailCanvas.height; y += gridSize) {
            const dx = x - lightX;
            const dy = y - lightY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 350;
            const influence = Math.max(0, 1 - distance / maxDistance);

            if (influence > 0.05) {
              // Calculate elevation based on distance from light
              const elevation = influence * 4;
              const offsetX = (dx / maxDistance) * elevation;
              const offsetY = (dy / maxDistance) * elevation;

              // Draw elevated grid lines with gradient
              const alpha = influence * 0.2;

              // Horizontal line
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(x + gridSize + offsetX, y + offsetY);
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.stroke();

              // Vertical line
              ctx.beginPath();
              ctx.moveTo(x + offsetX, y + offsetY);
              ctx.lineTo(x + offsetX, y + gridSize + offsetY);
              ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
              ctx.stroke();
            }
          }
        }
      } else {
        // Reset elements when mouse leaves
        const elements = getInteractiveElements();
        elements.forEach((element) => {
          element.style.transform = "";
          element.style.boxShadow = "";
        });
      }

      requestAnimationFrame(updateRelief);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      isInside = true;
    };

    const handleMouseLeave = () => {
      isInside = false;
      // Reset all elements
      const elements = getInteractiveElements();
      elements.forEach((element) => {
        element.style.transform = "";
        element.style.boxShadow = "";
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    updateRelief();

    const handleResize = () => {
      resizeTrailCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary flex justify-center items-center min-h-dvh"
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 dark:opacity-20"
      />

      {/* 3D Relief Effect Canvas */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 pointer-events-none z-5"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8 text-center min-h-dvh pt-24 pb-12">
          {/* Floating Icons */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 animate-bounce" style={{ animationDelay: '300ms' }}>
              <Code2 className="w-6 h-6 text-primary/60" />
            </div>
            <div className="absolute -top-2 -right-6 animate-bounce" style={{ animationDelay: '500ms' }}>
              <Sparkles className="w-5 h-5 text-accent/60" />
            </div>
            <div className="absolute -bottom-4 left-2 animate-bounce" style={{ animationDelay: '700ms' }}>
              <Zap className="w-5 h-5 text-primary/60" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm relief-element">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("badge")}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="font-bold tracking-tight font-headline text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] leading-[1.1]">
                <span className="block">{t("title-start")}</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  <TypingAnimation words={animatedWords} />
                </span>
                {t("title-end") && <span className="block">{t("title-end")}</span>}
              </h1>

              {/* Subtitle with enhanced styling */}
              <p className="mx-auto max-w-[700px] text-muted-foreground text-[1.1rem] sm:text-[1.35rem] lg:text-[1.6rem] leading-relaxed font-light">
                {t("subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group relief-element"
              >
                <a href="#projects">
                  {t("ctaPrimary")}
                  <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform inline-block" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-lg border-2 hover:bg-primary/5 transition-all duration-300 hover:scale-105 relief-element"
              >
                <a href="#contact">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </div>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105 relief-element"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none z-10">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60 opacity-70">
              <span className="text-xs font-medium">Scroll</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
