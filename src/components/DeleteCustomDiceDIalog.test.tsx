import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import DeleteCustomDiceDialog from "./DeleteCustomDiceDialog";
import { useDiceDB } from "../context/CustomDiceDbProvider";
import { deleteDice as storeDiceDelete } from "../storage/customDiceStore";
import { useNavigate } from "react-router";

// 1. Mock external dependencies
vi.mock("../context/CustomDiceDbProvider", () => ({
  useDiceDB: vi.fn(),
}));

vi.mock("../storage/customDiceStore", () => ({
  deleteDice: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock HTMLDialogElement methods for JSDOM
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

describe("DeleteCustomDiceDialog Component", () => {
  const mockNavigate = vi.fn();
  const mockDb = { name: "test-db" };
  const mockDiceId = "custom-dice-123";

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it("should render loading state when db is loading", () => {
    (useDiceDB as any).mockReturnValue({
      db: null,
      isLoading: true,
      error: null,
    });

    render(<DeleteCustomDiceDialog diceId={mockDiceId} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should open the delete dialog when the initial delete button is clicked", () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });

    render(<DeleteCustomDiceDialog diceId={mockDiceId} />);

    const triggerButton = screen.getByRole("button", {
      name: /delete this custom dice/i,
    });
    fireEvent.click(triggerButton);

    // Explicitly look for the heading element to avoid conflicting with the button text
    expect(
      screen.getByRole("heading", { name: /delete dice/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to delete this dice/i),
    ).toBeInTheDocument();
  });

  it("should call deleteDice and navigate to settings when confirmation button is clicked", async () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });
    (storeDiceDelete as any).mockResolvedValue(true);

    render(<DeleteCustomDiceDialog diceId={mockDiceId} />);

    // Open the dialog modal
    fireEvent.click(
      screen.getByRole("button", { name: /delete this custom dice/i }),
    );

    // Find and click the confirm delete button inside the hidden dialog
    const confirmDeleteButton = screen.getByRole("button", {
      name: /delete dice/i,
      hidden: true,
    });
    fireEvent.click(confirmDeleteButton);

    // Verify database removal execution and subsequent application redirect
    await waitFor(() => {
      expect(storeDiceDelete).toHaveBeenCalledWith(mockDb, mockDiceId);
      expect(mockNavigate).toHaveBeenCalledWith("/poker-dice-d6/settings", {
        replace: true,
      });
    });
  });

  it("should not trigger database updates or routing adjustments if diceId is missing", async () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });

    render(<DeleteCustomDiceDialog diceId={undefined} />);

    fireEvent.click(
      screen.getByRole("button", { name: /delete this custom dice/i }),
    );

    const confirmDeleteButton = screen.getByRole("button", {
      name: /delete dice/i,
      hidden: true,
    });
    fireEvent.click(confirmDeleteButton);

    // Verify it ignored the operation instead of crashing
    expect(storeDiceDelete).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
