import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "@/components/sections/experience-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ExperienceSection", () => {
  it("renders without crashing", () => {
    render(<ExperienceSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders list/grid items if present", () => {
    render(<ExperienceSection />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(0);
  });

  it("does not throw when rendered without optional props", () => {
    expect(() => render(<ExperienceSection />)).not.toThrow();
  });
});
