import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsDialog from "./SettingsDialog";

describe("SettingsDialog", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    };
  });

  it("opens and closes the dialog when the button is clicked", async () => {
    render(
      <SettingsDialog>
        <div>Test Content</div>
      </SettingsDialog>,
    );

    const openButton = screen.getByRole("button", { name: "Open Settings" });
    const content = screen.getByText("Test Content");

    expect(content).not.toBeVisible();

    fireEvent.click(openButton);
    expect(content).toBeVisible();

    const closeButton = screen.getByRole("button", { name: "Close" });

    fireEvent.click(closeButton);
    expect(content).not.toBeVisible();
  });
});
