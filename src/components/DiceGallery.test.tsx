import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import DiceGallery from "./DiceGallery";
import { useDiceEngine } from "../context/DiceContextProvider";

const mockNavigate = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

vi.mock("../context/DiceContextProvider", () => ({
  useDiceEngine: vi.fn(),
}));

vi.mock("./DiceSideThumbnail", () => ({
  default: vi.fn(({ alt, className }) => (
    <img data-testid="mock-thumb" alt={alt} className={className} />
  )),
}));

describe("DiceGallery Component", () => {
  const mockSides = [
    { id: "side-a", value: 1 },
    { id: "side-b", value: 2 },
  ];

  const defaultProps = {
    width: 150,
    height: 150,
    backgroundColor: "#26262b",
    forgroundColor: "#ffffff",
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return null and block rendering if the model context is missing", () => {
    (useDiceEngine as any).mockReturnValue({ model: null });

    const { container } = renderWithRouter(<DiceGallery {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("should return null if the model exists but lacks rendering sides", () => {
    (useDiceEngine as any).mockReturnValue({ model: { form: {} } });

    const { container } = renderWithRouter(<DiceGallery {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render a gallery item button for every side present on the active model", () => {
    (useDiceEngine as any).mockReturnValue({
      model: { form: { sides: mockSides } },
    });

    renderWithRouter(<DiceGallery {...defaultProps} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    const buttons = screen.getAllByRole("button", {
      name: /select to edit dice side/i,
    });
    expect(buttons).toHaveLength(2);
  });

  it("should trigger navigation or logs when the item button is clicked", () => {
    (useDiceEngine as any).mockReturnValue({
      model: { form: { sides: mockSides } },
    });

    renderWithRouter(<DiceGallery {...defaultProps} />);

    const buttons = screen.getAllByRole("button", {
      name: /select to edit dice side/i,
    });

    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
