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

  it("opens and closes the dialog and triggers onClose when button is clicked", async () => {
    const mockOnClose = jest.fn();

    render(
      <SettingsDialog onClose={mockOnClose}>
        <div>Test Content</div>
      </SettingsDialog>,
    );

    const openButton = screen.getByRole("button", { name: /open settings/i });
    const content = screen.getByText("Test Content");

    expect(content).not.toBeVisible();

    fireEvent.click(openButton);
    expect(content).toBeVisible();

    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    expect(content).not.toBeVisible();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
