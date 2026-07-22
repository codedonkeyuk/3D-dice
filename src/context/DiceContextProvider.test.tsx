import React from "react";
import { render, renderHook } from "@testing-library/react";
import { useLocation } from "react-router"; // We will mock this hook
import { DiceContextProvider, useDiceEngine } from "./DiceContextProvider";
import * as diceFindModule from "../dice/find";

jest.mock("../dice/find", () => ({
  findDice: jest.fn((type: string) => {
    if (type === "poker-dice-d6") return { form: {}, base_val: 10 };
    return null;
  }),
}));

jest.mock("react-router", () => ({
  useLocation: jest.fn(() => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "default",
  })),
  useNavigate: jest.fn(() => jest.fn()),
}));

const mockFindDice = diceFindModule.findDice as jest.Mock;

describe("DiceContext Unit Tests", () => {
  const mockedUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should provide default values when no search params are present", () => {
    mockedUseLocation.mockReturnValue({ search: "" });

    render(
      <DiceContextProvider>
        <div />
      </DiceContextProvider>,
    );

    expect(mockFindDice).toHaveBeenCalledWith("poker-dice-d6");
  });

  it("should correctly map URL parameters to the context model", () => {
    mockedUseLocation.mockReturnValue({
      search:
        "?dice-type=custom&background-color=#00FF00&foreground-color=#000000",
    });

    render(
      <DiceContextProvider>
        <div />
      </DiceContextProvider>,
    );

    expect(mockFindDice).toHaveBeenCalledWith("custom");
  });

  it("should set model to null if dice-type is not found", () => {
    const { result } = renderHook(() => useDiceEngine(), {
      wrapper: DiceContextProvider,
    });

    expect(result.current.model).toBeNull();
  });

  it("should throw an error when used outside of DiceContextProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useDiceEngine());
    }).toThrow("useDiceEngine framework error");

    spy.mockRestore();
  });
});
