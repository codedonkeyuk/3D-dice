import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HtmlDialog from "./Dialog";

describe("HtmlDialog", () => {
  it("should render the button to open the dialog", () => {
    render(<HtmlDialog buttonText="Open" />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("should render the children content and Close button", () => {
    render(
      <HtmlDialog buttonText="Open">
        <div>Dialog Content</div>
      </HtmlDialog>
    );
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});
