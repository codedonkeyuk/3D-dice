import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Error404 } from "./Errors";

describe("Errors Component", () => {
  describe("404 Error", () => {
    it("should render header and message", () => {
      render(<Error404 />);
      expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
      expect(
        screen.getByText("Sorry, the page you are looking for does not exist."),
      ).toBeInTheDocument();
    });

    it("should render the return to main page link", () => {
      render(<Error404 />);
      expect(
        screen.getByRole("link", { name: /return to main page/i }),
      ).toBeInTheDocument();
    });
  });
});
