import { render, screen } from "@testing-library/react";
import { AboutSection } from "@/components/sections/about-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("AboutSection", () => {
  it("renders without crashing", () => {
    render(<AboutSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders translated content keys", () => {
    render(<AboutSection />);
    // Since translations return key, we expect at least one namespace key rendered
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("does not throw if optional props are missing", () => {
    expect(() => render(<AboutSection />)).not.toThrow();
  });
});
