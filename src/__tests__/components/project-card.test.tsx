import { render, screen } from "@testing-library/react";
import { ProjectCard, type Project } from "@/components/project-card";

const baseProject: Project = {
  title: "Test Project",
  description: "Test Description",
  tags: ["React", "Next.js"],
  image: {
    id: "test",
    description: "test description",
    imageUrl: "/test.jpg",
    imageHint: "test image",
  },
};

describe("ProjectCard - External URL behavior", () => {
  it("renders external link when valid https url is provided (positive case)", () => {
    const project: Project = {
      ...baseProject,
      externalUrl: "https://example.com",
    };

    render(<ProjectCard project={project} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render link when externalUrl is undefined (negative case)", () => {
    render(<ProjectCard project={baseProject} />);

    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("does not render link when externalUrl is empty string (edge case)", () => {
    const project: Project = {
      ...baseProject,
      externalUrl: "",
    };

    render(<ProjectCard project={project} />);

    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("does not render link when url does not start with https (security negative case)", () => {
    const project: Project = {
      ...baseProject,
      externalUrl: "javascript:alert(1)",
    };

    render(<ProjectCard project={project} />);

    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("renders translated key text via next-intl mock", () => {
    const project: Project = {
      ...baseProject,
      externalUrl: "https://example.com",
    };

    render(<ProjectCard project={project} />);

    // next-intl mock returns the key itself
    expect(screen.getByText("viewProject")).toBeInTheDocument();
  });
});
