import { render, screen, fireEvent } from "@testing-library/react";
import SettingsDialog from "./SettingsDialog";

const mockShowModal = jest.fn();
const mockClose = jest.fn();

beforeAll(() => {
  (HTMLDialogElement.prototype as any).showModal = mockShowModal;
  (HTMLDialogElement.prototype as any).close = mockClose;
});

describe("SettingsDialog Component", () => {
  beforeEach(() => {
    mockShowModal.mockClear();
    mockClose.mockClear();
  });

  it("renders the opening button and the content inside the dialog", () => {
    render(
      <SettingsDialog>
        <div data-testid="content">Custom Content</div>
      </SettingsDialog>,
    );

    const openButton = screen.getByLabelText(/Open Settings/i);
    expect(openButton).toBeInTheDocument();

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it('calls showModal when the "Open Settings" button is clicked', () => {
    render(<SettingsDialog>Content</SettingsDialog>);

    const openButton = screen.getByLabelText(/Open Settings/i);
    fireEvent.click(openButton);

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  it('calls close when the "Close" button inside the dialog is clicked', () => {
    render(<SettingsDialog>Content</SettingsDialog>);

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("verifies the button has the correct accessibility attributes", () => {
    render(<SettingsDialog />);
    const openButton = screen.getByLabelText(/Open Settings/i);

    expect(openButton).toHaveAttribute("aria-label", "Open Settings");
  });
});
