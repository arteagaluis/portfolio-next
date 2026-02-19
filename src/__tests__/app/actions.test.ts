import { submitContactForm } from "@/app/actions"

describe("submitContactForm", () => {
  it("returns errors when validation fails", async () => {
    const formData = new FormData()
    formData.set("name", "A")
    formData.set("email", "invalid-email")
    formData.set("message", "short")

    const result = await submitContactForm(null, formData)

    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
    expect(result.message).toBe("Please correct the errors below.")
  })

  it("returns success when validation passes", async () => {
    const formData = new FormData()
    formData.set("name", "John Doe")
    formData.set("email", "john@example.com")
    formData.set("message", "This is a valid message content.")

    const result = await submitContactForm(null, formData)

    expect(result.success).toBe(true)
    expect(result.message).toContain("Thank you")
  })
})
