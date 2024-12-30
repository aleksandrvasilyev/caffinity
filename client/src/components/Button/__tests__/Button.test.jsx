import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders the button with the given children", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("disables the button when the disabled prop is true", () => {
    const onClickMock = jest.fn();
    render(
      <Button onClick={onClickMock} disabled>
        Disabled Button
      </Button>,
    );
    const buttonElement = screen.getByText("Disabled Button");
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("applies the custom className", () => {
    const customClass = "bg-red-500 text-white";
    render(<Button className={customClass}>Styled Button</Button>);
    const buttonElement = screen.getByText("Styled Button");
    expect(buttonElement).toHaveClass("bg-red-500");
    expect(buttonElement).toHaveClass("text-white");
  });

  it("renders the button with the correct type attribute", () => {
    render(<Button type="submit">Submit Button</Button>);
    const buttonElement = screen.getByText("Submit Button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
});
