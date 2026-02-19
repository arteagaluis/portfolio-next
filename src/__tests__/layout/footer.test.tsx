import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

describe("Footer Component", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Luis Arteaga/)).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });
});
