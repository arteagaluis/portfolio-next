"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    
    // Add transition class to body for smooth theme change
    document.documentElement.style.transition = "background-color 0.5s ease, color 0.5s ease"
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease"
    
    setTheme(theme === "dark" ? "light" : "dark")
    
    // Remove transition after animation completes
    setTimeout(() => {
      setIsAnimating(false)
      document.documentElement.style.transition = ""
      document.body.style.transition = ""
    }, 500)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative transition-all duration-300 hover:scale-110 ${
        isAnimating ? "animate-pulse scale-110" : ""
      }`}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "rotate-180 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        } ${isAnimating && theme === "light" ? "animate-spin" : ""}`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-180 scale-0 opacity-0"
        } ${isAnimating && theme === "dark" ? "animate-spin" : ""}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
