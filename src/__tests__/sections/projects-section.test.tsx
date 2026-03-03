import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/sections/projects-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ProjectsSection", () => {
  it("renders without crashing", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renders project cards if dataset exists", () => {
    render(<ProjectsSection />);
    // Initial content check
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("does not break with missing optional props", () => {
    expect(() => render(<ProjectsSection />)).not.toThrow();
  });
});
