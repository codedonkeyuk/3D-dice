import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DiceGallery from "./DiceGallery";
import { useDiceEngine } from "../context/DiceContextProvider";

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

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return null and block rendering if the model context is missing", () => {
    (useDiceEngine as any).mockReturnValue({ model: null });

    const { container } = render(<DiceGallery {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("should return null if the model exists but lacks rendering sides", () => {
    (useDiceEngine as any).mockReturnValue({ model: { form: {} } });

    const { container } = render(<DiceGallery {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render a gallery item button for every side present on the active model", () => {
    (useDiceEngine as any).mockReturnValue({
      model: { form: { sides: mockSides } },
    });

    render(<DiceGallery {...defaultProps} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    const buttons = screen.getAllByRole("button", {
      name: /select to edit dice side/i,
    });
    expect(buttons).toHaveLength(2);
  });

  it("should output 'hello world' and the target side dataset to console logs when clicked", () => {
    (useDiceEngine as any).mockReturnValue({
      model: { form: { sides: mockSides } },
    });

    render(<DiceGallery {...defaultProps} />);

    const firstButton = screen.getAllByRole("button", {
      name: /select to edit dice side/i,
    })[0];
    fireEvent.click(firstButton);

    expect(console.log).toHaveBeenCalledWith("hello world", mockSides[0]);
  });
});
