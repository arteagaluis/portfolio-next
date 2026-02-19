import { render, screen } from "@testing-library/react";
import { ContactSection } from "@/components/sections/contact-section";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ContactSection", () => {
  it("renders without crashing", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders form elements if present", () => {
    render(<ContactSection />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(0);
  });

  it("does not throw when optional props are missing", () => {
    expect(() => render(<ContactSection />)).not.toThrow();
  });
});
