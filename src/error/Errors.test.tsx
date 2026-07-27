import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Error404, Error500, ErrorDiceMissing } from "./Errors";

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
  describe("500 Error", () => {
    it("should render header and message", () => {
      render(<Error500 />);
      expect(
        screen.getByText("500 - An Internal Error Occured"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Try again and if it still does not work then this app is broken!",
        ),
      ).toBeInTheDocument();
    });

    it("should render the return to main page link", () => {
      render(<Error500 />);
      expect(
        screen.getByRole("link", { name: /return to main page/i }),
      ).toBeInTheDocument();
    });
  });
  describe("Missing Dice Error", () => {
    it("should render header and message", () => {
      render(<ErrorDiceMissing />);
      expect(screen.getByText("That Dice does not Exist")).toBeInTheDocument();
      expect(
        screen.getByText("You will need to go back and start again."),
      ).toBeInTheDocument();
    });

    it("should render the return to main page link", () => {
      render(<ErrorDiceMissing />);
      expect(
        screen.getByRole("link", { name: /return to main page/i }),
      ).toBeInTheDocument();
    });
  });
});
