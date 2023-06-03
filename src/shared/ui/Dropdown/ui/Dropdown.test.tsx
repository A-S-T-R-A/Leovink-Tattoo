import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { Dropdown } from "./Dropdown"

const options = [
    { value: "option1", label: "Option 1", id: 1 },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
]

describe("Dropdown", () => {
    test("Dropdown test", () => {
        render(<Dropdown options={options} onChange={jest.fn()} />)
        expect(screen.getByTestId("dropdown-label")).toBeInTheDocument()
        expect(screen.getByTestId("dropdown-option-base")).toBeInTheDocument()
        screen.debug()
    })

    test("Opions test", () => {
        const { getByText } = render(
            <Dropdown options={options} label="Test dropdown" value="option1" />
        )
        const dropdown = getByText("Option 1")
        expect(dropdown).toBeInTheDocument()
    })

    test("Chosen opions check", () => {
        const { getByText } = render(
            <Dropdown options={options} label="Test dropdown" value="option1" />
        )
        const dropdown = getByText("Option 1")
        expect(dropdown).toBeInTheDocument()
    })

    test("Test with dropdown option is selected", () => {
        render(<Dropdown options={options} />)
        expect(screen.getByText("Option 1")).toBeInTheDocument()
        fireEvent.change(screen.getByTestId("dropdown-label"), {
            target: { value: "option2" },
        })
        expect(screen.getByText("Option 2")).toBeInTheDocument()
    })

    // test("calls onChange when dropdown option is selected", () => {
    //     function TestDropdown() {
    //         const [value, setValue] = useState("Option 1")

    //         return (
    //             <Dropdown
    //                 options={options}
    //                 label="Test dropdown"
    //                 value={value}
    //                 onChange={value => {
    //                     console.log("value;", value)
    //                     setValue(value)
    //                 }}
    //             />
    //         )
    //     }
    //     const { getByText } = render(<TestDropdown />)

    //     const dropdown = getByText("Option 1")
    //     fireEvent.click(dropdown)
    //     const option = getByText("Option 2")
    //     fireEvent.click(option)

    //     // expect(TestDropdown).toHaveBeenCalledWith("option2")
    //     expect(screen.getByTestId("dropdown-label")).toHaveBeenCalledWith("option2")
    //     // expect(screen.getByTestId("dropdown-label")).toHaveAttribute("value", "option2")
    //     screen.debug()
    // })
})
