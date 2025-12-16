"use client";

import { ReactNode } from "react";
import { useLoader } from "@/context/loader-context";
import { cn } from "@/lib/utils";

export function ContentWrapper({ children }: { children: ReactNode }) {
  const { isLoading } = useLoader();

  return (
    <div
      className={cn(
        "transition-opacity duration-700",
        isLoading
          ? "opacity-0 pointer-events-none overflow-hidden"
          : "opacity-100"
      )}
    >
      {children}
    </div>
  );
}

