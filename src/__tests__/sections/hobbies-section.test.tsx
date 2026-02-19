import { render, screen } from "@testing-library/react";
import HobbiesSection from "@/components/sections/hobbies-section";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t: any = (key: string) => key;
    t.raw = (key: string) => {
      if (key === "items") {
        return ["item1", "item2"];
      }
      return [];
    };
    return t;
  },
}));

describe("HobbiesSection", () => {
  it("renders without crashing", () => {
    render(<HobbiesSection />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders interactive hobby items if present", () => {
    render(<HobbiesSection />);
    const items = screen.getAllByRole("button");
    expect(items.length).toBeGreaterThan(0);
  });

  it("does not throw if optional props are undefined", () => {
    expect(() => render(<HobbiesSection />)).not.toThrow();
  });
});
