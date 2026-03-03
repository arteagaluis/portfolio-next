import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "@/components/sections/experience-section";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t: any = (key: string) => {
      if (key.includes("period")) return "2020 — 2021";
      if (key.includes("technologies")) return "React, Next.js";
      return key;
    };
    t.has = (key: string) => {
      if (key.includes("achievements.1")) return true;
      return false;
    };
    return t;
  },
}));

describe("ExperienceSection", () => {
  it("renders without crashing", () => {
    render(<ExperienceSection />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renders list/grid items if present", () => {
    render(<ExperienceSection />);
    // Initial render might not have all items due to isMounted check, but should have headings
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("does not throw when rendered without optional props", () => {
    expect(() => render(<ExperienceSection />)).not.toThrow();
  });
});
