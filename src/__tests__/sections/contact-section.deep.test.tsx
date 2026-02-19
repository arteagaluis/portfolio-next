import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ContactSection } from "@/components/sections/contact-section"

jest.mock("@/app/actions", () => ({
  submitContactForm: jest.fn(),
}))

import { submitContactForm } from "@/app/actions"

describe("ContactSection deep coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders form fields and texts", () => {
    render(<ContactSection />)

    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("namePlaceholder")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("messagePlaceholder")).toBeInTheDocument()
  })

  it("handles successful submit", async () => {
    ;(submitContactForm as jest.Mock).mockResolvedValue({
      success: true,
      message: "ok",
    })

    render(<ContactSection />)

    fireEvent.change(screen.getByPlaceholderText("namePlaceholder"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByPlaceholderText("emailPlaceholder"), {
      target: { value: "john@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("messagePlaceholder"), {
      target: { value: "This is a valid message." },
    })

    fireEvent.click(screen.getByRole("button"))

    await waitFor(() =>
      expect(submitContactForm).toHaveBeenCalled()
    )
  })

  it("handles failed submit with server errors", async () => {
    ;(submitContactForm as jest.Mock).mockResolvedValue({
      success: false,
      message: "Server error",
      errors: {
        name: ["Name error"],
        email: ["Email error"],
        message: ["Message error"],
      },
    })

    render(<ContactSection />)

    fireEvent.change(screen.getByPlaceholderText("namePlaceholder"), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByPlaceholderText("emailPlaceholder"), {
      target: { value: "john@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("messagePlaceholder"), {
      target: { value: "This is a valid message." },
    })

    fireEvent.click(screen.getByRole("button"))

    await waitFor(() =>
      expect(submitContactForm).toHaveBeenCalled()
    )
  })
})
