import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("should render the loading text correctly", () => {
    render(<Loading />);
    expect(screen.getByText("Loading Feature...")).toBeInTheDocument();
  });

  it("should have the correct accessibility attributes", () => {
    render(<Loading />);
    const loader = screen.getByRole("status");
    expect(loader).toHaveAttribute("aria-live", "polite");
    expect(loader).toHaveAttribute("aria-busy", "true");
  });
});
