import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/sections/hero-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<HeroSection />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
