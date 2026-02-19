import { render, screen, fireEvent } from "@testing-library/react"
import { HeroSection } from "@/components/sections/hero-section"

describe("HeroSection deep coverage", () => {
  it("renders all main translated texts", () => {
    render(<HeroSection />)

    expect(screen.getByText("badge")).toBeInTheDocument()
    expect(screen.getByText("title-start")).toBeInTheDocument()
    expect(screen.getByText("title-end")).toBeInTheDocument()
    expect(screen.getByText("subtitle")).toBeInTheDocument()
    expect(screen.getByText("button")).toBeInTheDocument()
    expect(screen.getByText("button-secondary")).toBeInTheDocument()
  })

  it("renders tech stack items", () => {
    render(<HeroSection />)

    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("Node.js")).toBeInTheDocument()
  })

  it("renders anchor links correctly", () => {
    render(<HeroSection />)

    const projectsLink = screen.getByRole("link", { name: "button" })
    const contactLink = screen.getByRole("link", { name: "button-secondary" })

    expect(projectsLink).toHaveAttribute("href", "#projects")
    expect(contactLink).toHaveAttribute("href", "#contact")
  })

  it("handles mouse enter and leave events", () => {
    render(<HeroSection />)

    const section = document.getElementById("home")

    if (section) {
      fireEvent.mouseEnter(section)
      fireEvent.mouseMove(section, { clientX: 100, clientY: 100 })
      fireEvent.mouseLeave(section)
    }

    expect(section).toBeInTheDocument()
  })
})
