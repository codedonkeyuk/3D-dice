import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ButtonBarDiv, PrimaryButton, SecondaryButton, PrimaryButtonLink, SecondaryButtonLink } from "./Buttons";

describe("Buttons Component", () => {
  it("should render PrimaryButton with correct text", () => {
    render(<PrimaryButton>Primary</PrimaryButton>);
    expect(screen.getByText("Primary")).toBeInTheDocument();
  });

  it("should render SecondaryButton with correct text", () => {
    render(<SecondaryButton>Secondary</SecondaryButton>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("should render PrimaryButtonLink correctly", () => {
    render(
      <MemoryRouter>
        <PrimaryButtonLink to="/test">Primary Link</PrimaryButtonLink>
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute('href', '/test');
    expect(screen.getByText("Primary Link")).toBeInTheDocument();
  });

  it("should render SecondaryButtonLink correctly", () => {
    render(
      <MemoryRouter>
        <SecondaryButtonLink to="/secondary" >Secondary Link</SecondaryButtonLink>
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).toHaveAttribute('href', '/secondary');
    expect(screen.getByText("Secondary Link")).toBeInTheDocument();
  });

  it("should render ButtonBarDiv", () => {
    render(
      <ButtonBarDiv>
        <PrimaryButton>Button 1</PrimaryButton>
        <PrimaryButton>Button 2</PrimaryButton>
      </ButtonBarDiv>
    );
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });
});
