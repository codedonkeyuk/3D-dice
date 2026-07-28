import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import DicePreviewImage from "./DicePreviewImage";
import { useDiceEngine } from "../context/DiceContextProvider";
import { type SideGraphics } from "../types";

vi.mock("../context/DiceContextProvider", () => ({
  useDiceEngine: vi.fn(),
}));

vi.mock("./DiceSideThumbnail", () => {
  return {
    default: function MockDiceSideThumbnail(props: any) {
      return (
        <div data-testid="mock-thumbnail" data-props={JSON.stringify(props)}>
          Dice Thumbnail Side Type: {props.side?.type}
        </div>
      );
    },
  };
});

describe("DicePreviewImage Component", () => {
  const defaultProps = {
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
  };

  const mockSide1: SideGraphics = {
    type: "graphics",
    systemElements: [],
    elements: [],
    backgroundColor: "#ff0000",
  };

  const mockSide2: SideGraphics = {
    type: "graphics",
    systemElements: [],
    elements: [],
    backgroundColor: "#00ff00",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing (null) if model is not present", () => {
    vi.mocked(useDiceEngine).mockReturnValue({
      model: undefined,
      refresh: () => {},
    });

    const { container } = render(<DicePreviewImage {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing (null) if sides array is empty", () => {
    vi.mocked(useDiceEngine).mockReturnValue({
      model: {
        form: {
          sides: [],
          type: "plastic-model-setup",
          thumbnail: null,
        },
        name: "",
        category: "model",
        description: "",
        readOnly: false,
        piece: {
          modelId: "",
          renderType: "mesh",
          metalic: false,
          transparent: false,
        },
      },
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    const { container } = render(<DicePreviewImage {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the last side, the caption, and passes correct props", () => {
    vi.mocked(useDiceEngine).mockReturnValue({
      model: {
        form: {
          sides: [mockSide1, mockSide2],
          type: "plastic-model-setup",
          thumbnail: null,
        },
        name: "",
        category: "model",
        description: "",
        readOnly: false,
        piece: {
          modelId: "",
          renderType: "mesh",
          metalic: false,
          transparent: false,
        },
      },
      refresh: function (): void {
        throw new Error("Function not implemented.");
      },
    });

    render(<DicePreviewImage {...defaultProps} />);

    const expectedCaption =
      "Preview of Side 2, this is not a representation of the fully rendered dice.";
    expect(screen.getByText(expectedCaption)).toBeInTheDocument();

    const thumbnail = screen.getByTestId("mock-thumbnail");
    expect(thumbnail).toBeInTheDocument();

    const passedProps = JSON.parse(
      thumbnail.getAttribute("data-props") || "{}",
    );

    expect(passedProps.side).toEqual(mockSide2);
    expect(passedProps.side.type).toBe("graphics");

    expect(passedProps.width).toBe(225);
    expect(passedProps.height).toBe(225);
    expect(passedProps.backgroundColor).toBe("#ffffff");
    expect(passedProps.foregroundColor).toBe("#000000");
  });
});
