import { render } from "@testing-library/react";
import React from "react";
import SvgWrapper from "../SvgWrapper";

describe("SvgWrapper", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<SvgWrapper>Test</SvgWrapper>);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "30");
    expect(svgElement).toHaveAttribute("height", "30");
    expect(svgElement).toHaveAttribute("fill", "currentColor");
    expect(svgElement).toHaveClass("icon");
    expect(svgElement).toHaveTextContent("Test");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SvgWrapper className="custom-class">Test</SvgWrapper>,
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveClass("custom-class");
  });

  it("applies custom size", () => {
    const { container } = render(<SvgWrapper size={50}>Test</SvgWrapper>);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", "50");
    expect(svgElement).toHaveAttribute("height", "50");
  });

  it("renders the children correctly", () => {
    const { container } = render(
      <SvgWrapper size={50}>
        <circle cx="25" cy="25" r="20" />
      </SvgWrapper>,
    );
    const svgElement = container.querySelector("svg");
    expect(svgElement).toContainHTML(
      "<circle cx='25' cy='25' r='20'></circle>",
    );
  });
});
