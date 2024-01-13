import "@testing-library/jest-dom"; // Import jest-dom to extend Jest matchers
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./App"; // Replace 'MyComponent' with the actual name of your component

describe("MyComponent", () => {
  it("renders without errors", () => {
    render(<MyComponent />);
    const header = screen.getByRole("heading", { name: /my component/i });
    expect(header).toBeInTheDocument();
  });

  it("displays a button that can be clicked", () => {
    render(<MyComponent />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const outputText = screen.getByText(/button clicked/i);
    expect(outputText).toBeInTheDocument();
  });

  it("contains a link to the React documentation", () => {
    render(<MyComponent />);
    const linkElement = screen.getByRole("link", {
      name: /react documentation/i,
    });
    expect(linkElement).toHaveAttribute("href", "https://reactjs.org/");
  });
});
