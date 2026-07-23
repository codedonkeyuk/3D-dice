import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading Component", () => {
  test("renders the loading component container correctly", () => {
    render(<Loading />);

    const loaderContainer = screen.getByRole("status");
    expect(loaderContainer).toBeInTheDocument();
  });

  test("contains the correct accessibility attributes for single page apps", () => {
    render(<Loading />);

    const loaderContainer = screen.getByRole("status");

    expect(loaderContainer).toHaveAttribute("aria-live", "polite");

    expect(loaderContainer).toHaveAttribute("aria-busy", "true");
  });

  test("displays the correct loading text message", () => {
    render(<Loading />);

    const loadingText = screen.getByText("Loading Feature...");
    expect(loadingText).toBeInTheDocument();
  });

  test("contains the structural layout classes for your CSS file", () => {
    render(<Loading />);

    const loaderContainer = screen.getByRole("status");

    expect(loaderContainer).toHaveClass("loader-background");

    const messageWrapper = loaderContainer.querySelector(".loader-message");
    const spinnerElement = loaderContainer.querySelector(".spinner");

    expect(messageWrapper).toBeInTheDocument();
    expect(spinnerElement).toBeInTheDocument();
  });
});
