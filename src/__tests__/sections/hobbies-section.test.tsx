import { render, screen } from "@testing-library/react";
import HobbiesSection from "@/components/sections/hobbies-section";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t: any = (key: string) => key;
    t.raw = (key: string) => {
      if (key === "items") {
        return [
          {
            id: "systems",
            title: "Systemic Thinking & Philosophy",
            description: "Analyzing complex systems.",
            highlight: "Complexity Theory",
          },
          {
            id: "ai",
            title: "AI & Agentic Workflows",
            description: "Experimenting with LLMs.",
            highlight: "Autonomous Systems",
          },
        ];
      }
      return [];
    };
    return t;
  },
}));

describe("HobbiesSection", () => {
  it("renders without crashing", () => {
    render(<HobbiesSection />);
    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
  });

  it("renders structured hobby items if present", () => {
    render(<HobbiesSection />);
    const items = screen.getAllByRole("article");
    expect(items.length).toBeGreaterThan(0);
  });

  it("does not throw if optional props are undefined", () => {
    expect(() => render(<HobbiesSection />)).not.toThrow();
  });
});
