import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SettingsButton from "./SettingsButton";
import { MemoryRouter, Routes, Route } from "react-router";

describe("SettingsButton Component", () => {
  it("should render the button with correct aria-label", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6"]}>
        <Routes>
          <Route path="/:diceId" element={<SettingsButton />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /dice settings/i }),
    ).toBeInTheDocument();
  });

  it("should have the correct destination URL including params", () => {
    render(
      <MemoryRouter initialEntries={["/poker-dice-d6"]}>
        <Routes>
          <Route path="/:diceId" element={<SettingsButton />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByRole("link", { name: /dice settings/i });
    expect(button).toHaveAttribute("href", "/poker-dice-d6/settings");
  });

  it("should include search parameters in the destination URL", () => {
    render(
      <MemoryRouter
        initialEntries={["/poker-dice-d6?foreground-color=%23FF0000"]}
      >
        <Routes>
          <Route path="/:diceId" element={<SettingsButton />} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByRole("link", { name: /dice settings/i });
    expect(button).toHaveAttribute(
      "href",
      "/poker-dice-d6/settings?foreground-color=%23FF0000",
    );
  });
});
