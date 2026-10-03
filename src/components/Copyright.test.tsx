import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Copyright";

describe("Footer Component", () => {
  it("should render the copyright text correctly", () => {
    render(<Footer />);

    const copyrightText = screen.getByText(
      /© 2026 codedonkey\.uk\. All rights reserved\./i,
    );
    expect(copyrightText).toBeDefined();
  });

  it("should render the Privacy Notice link with the correct URL", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: /privacy notice/i });

    expect(privacyLink).toBeDefined();
    expect(privacyLink.getAttribute("href")).toBe(
      "https://codedonkey.uk/privacy-notice",
    );
  });
});
