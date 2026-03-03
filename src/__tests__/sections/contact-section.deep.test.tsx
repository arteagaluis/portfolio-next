import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ContactSection } from "@/components/sections/contact-section"

global.fetch = jest.fn() as jest.Mock

describe("ContactSection deep coverage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ success: true, message: "ok" }),
      })
  })

  it("renders form fields and texts", () => {
    render(<ContactSection />)

    expect(screen.getByRole("heading")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("namePlaceholder")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("messagePlaceholder")).toBeInTheDocument()
  })

  it("handles successful submit", async () => {
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

    fireEvent.click(screen.getByRole("button", { name: "submitButton" }))

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
        method: "POST",
      }))
    )
  })

  it("handles failed submit with field errors", async () => {
    ; (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          success: false,
          message: "Validation failed",
          errors: {
            name: ["Name error"],
          },
        }),
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

    fireEvent.click(screen.getByRole("button", { name: "submitButton" }))

    await waitFor(() => expect(screen.getByText("Name error")).toBeInTheDocument())
  })

  it("handles failed submit with generic error", async () => {
    ; (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false, message: "Generic error" }),
    })

    render(<ContactSection />)

    fireEvent.change(screen.getByPlaceholderText("namePlaceholder"), { target: { value: "John Doe" } })
    fireEvent.change(screen.getByPlaceholderText("emailPlaceholder"), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByPlaceholderText("messagePlaceholder"), { target: { value: "This is a valid message." } })

    fireEvent.click(screen.getByRole("button", { name: "submitButton" }))

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })
})
