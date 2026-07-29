import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CreateCustomDiceDialog from "./CreateCustomDiceDialog";
import { useDiceDB } from "../context/CustomDiceDbProvider";
import { validateId, saveCustomDice } from "../storage/customDiceStore";
import { findDice } from "../models/find";
import { useNavigate } from "react-router";

vi.mock("../context/CustomDiceDbProvider", () => ({
  useDiceDB: vi.fn(),
}));

vi.mock("../storage/customDiceStore", () => ({
  validateId: vi.fn(),
  saveCustomDice: vi.fn(),
}));

vi.mock("../models/find", () => ({
  findDice: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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

describe("CreateCustomDiceDialog Component", () => {
  const mockNavigate = vi.fn();
  const mockDb = { name: "test-db" };

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

    render(<CreateCustomDiceDialog />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should open the dialog when the create button is clicked", () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });
    (validateId as any).mockResolvedValue(true);

    render(<CreateCustomDiceDialog />);

    const triggerButton = screen.getByRole("button", {
      name: /create custom dice/i,
    });
    fireEvent.click(triggerButton);

    const heading = screen.getByRole("heading", {
      name: /create custom dice/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should show an error message if the name validation fails", async () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });
    (validateId as any).mockResolvedValue(false);

    render(<CreateCustomDiceDialog />);

    const input = screen.getByLabelText(/name/i);
    fireEvent.change(input, { target: { value: "ExistingDice" } });

    await waitFor(() => {
      expect(
        screen.getByText(/The name you just entered already exists/i),
      ).toBeInTheDocument();
    });

    const createButton = screen.getByRole("button", {
      name: /create dice/i,
      hidden: true,
    });
    expect(createButton).toBeDisabled();
  });

  it("should submit the form, save the dice, and navigate on success", async () => {
    (useDiceDB as any).mockReturnValue({
      db: mockDb,
      isLoading: false,
      error: null,
    });
    (validateId as any).mockResolvedValue(true);
    (findDice as any).mockReturnValue({ form: { sides: 6 } });
    (saveCustomDice as any).mockResolvedValue("generated-db-id");

    render(<CreateCustomDiceDialog />);

    fireEvent.click(
      screen.getByRole("button", { name: /create custom dice/i }),
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Lucky D6" },
    });
    fireEvent.change(screen.getByLabelText(/dice template/i), {
      target: { value: "blank-dice-d6" },
    });

    const createButton = screen.getByRole("button", { name: /create dice/i });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(saveCustomDice).toHaveBeenCalledWith(mockDb, {
        name: "Lucky D6",
        diceTemplate: "blank-dice-d6",
        sides: 6,
      });
      expect(mockNavigate).toHaveBeenCalledWith("/generated-db-id/settings", {
        replace: true,
      });
    });
  });
});
