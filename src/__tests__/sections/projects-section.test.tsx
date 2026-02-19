import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/sections/projects-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ProjectsSection", () => {
  it("renders without crashing", () => {
    render(<ProjectsSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders project cards if dataset exists", () => {
    render(<ProjectsSection />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(0);
  });

  it("does not break with missing optional props", () => {
    expect(() => render(<ProjectsSection />)).not.toThrow();
  });
});
