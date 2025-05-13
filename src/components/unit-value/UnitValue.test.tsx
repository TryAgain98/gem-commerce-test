import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import UnitValue from "./UnitValue"
import { describe, it, expect } from "vitest"

describe("UnitValue Component", () => {
  it("should replace comma with period", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "12,3")

    expect(input).toHaveValue("12.3")
  })

  it("should remove non-numeric characters", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "123a")

    expect(input).toHaveValue("123")
  })

  it("should convert a123 to the nearest numeric value", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "a123")

    expect(input).toHaveValue("123")
  })

  it("should automatically reset to 0 when value is less than 0", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "-10")
    fireEvent.blur(input)

    expect(input).toHaveValue("0")
  })

  it("should disable '+' button when value is 100 and unit is %", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")
    await userEvent.clear(input)
    await userEvent.type(input, "0")

    const incrementButton = screen.getByText("+")
    expect(incrementButton).not.toBeDisabled()

    await userEvent.clear(input)
    await userEvent.type(input, "100")
    expect(incrementButton).toBeDisabled()
  })

  it("should automatically limit to 100 when unit is % and value exceeds 100", async () => {
    render(<UnitValue unit="%" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "150")
    fireEvent.blur(input)

    expect(input).toHaveValue("100")
  })

  it("should automatically convert to 100 when switching from px to % with value over 100", async () => {
    const { rerender } = render(<UnitValue unit="px" />)
    const input = screen.getByRole("textbox")

    await userEvent.clear(input)
    await userEvent.type(input, "150")

    rerender(<UnitValue unit="%" />)
    expect(input).toHaveValue("100")
  })
})
