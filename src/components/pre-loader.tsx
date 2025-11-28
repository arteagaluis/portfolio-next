"use client";

import { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLoader } from '@/context/loader-context';

export function PreLoader() {
  const { isLoading, setIsLoading } = useLoader();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading && isMounted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Duration of the loader
      return () => clearTimeout(timer);
    }
  }, [isLoading, isMounted, setIsLoading]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className={cn(
        "flex items-center gap-4 transition-all duration-700",
        isLoading ? "scale-100 opacity-100" : "scale-125 opacity-0"
      )}>
        <Code2 className="h-12 w-12 text-primary" />
        <span className="font-headline text-4xl font-bold">Personal Canvas</span>
      </div>
    </div>
  );
}
