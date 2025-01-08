import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

describe("Input Component", () => {
  const mockOnChange = jest.fn(); // Mock the onChange function
  const defaultProps = {
    placeholder: "Enter text",
    type: "text",
    name: "testInput",
    onChange: mockOnChange,
  };

  it("renders correctly with required props", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", defaultProps.type);
    expect(inputElement).toHaveAttribute("name", defaultProps.name);
  });

  it("calls the onChange handler when input value changes", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(inputElement, { target: { value: "Hello World" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("supports different input types", () => {
    const { rerender } = render(<Input {...defaultProps} type="password" />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
    expect(inputElement).toHaveAttribute("type", "password");

    rerender(<Input {...defaultProps} type="email" />);
    expect(inputElement).toHaveAttribute("type", "email");
  });

  it("applies the correct class names", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
    expect(inputElement).toHaveClass(
      "w-full p-3 rounded text-black mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent",
    );
  });

  it("handles missing placeholder gracefully", () => {
    const { container } = render(
      <Input type="text" name="testInput" onChange={mockOnChange} />,
    );

    const inputElement = container.querySelector("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).not.toHaveAttribute("placeholder");
  });
});
