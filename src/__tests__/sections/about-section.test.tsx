import { render, screen } from "@testing-library/react";
import { AboutSection } from "@/components/sections/about-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key.startsWith("skills.")) return `${key}:description`;
    return key;
  },
}));

describe("AboutSection", () => {
  it("renders without crashing", () => {
    render(<AboutSection />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renders translated content keys", () => {
    render(<AboutSection />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("does not throw if optional props are missing", () => {
    expect(() => render(<AboutSection />)).not.toThrow();
  });
});
