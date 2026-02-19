import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";

/* next-intl is globally mocked in jest.setup.ts */

/* Navigation is globally mocked in jest.setup.ts */

describe("Header Component", () => {
  it("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByText("Luis Arteaga")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
