import { renderHook, act } from "@testing-library/react"
import { useToast, reducer } from "@/hooks/use-toast"

describe("useToast hook", () => {
  it("adds a toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: "Test",
        description: "Description",
      })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe("Test")
  })

  it("dismisses a toast", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      const t = result.current.toast({
        title: "Dismiss me",
      })
      result.current.dismiss(t.id)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })
})

describe("toast reducer", () => {
  it("removes toast when REMOVE_TOAST is dispatched", () => {
    const initialState = {
      toasts: [
        { id: "1", open: true } as any,
        { id: "2", open: true } as any,
      ],
    }

    const newState = reducer(initialState as any, {
      type: "REMOVE_TOAST",
      toastId: "1",
    } as any)

    expect(newState.toasts.length).toBe(1)
    expect(newState.toasts[0].id).toBe("2")
  })
})
