import { render, screen } from "@testing-library/react";
import { StateContextProvider } from "context/StateContextProvider";
import Cell from "../components/Cell";

describe("Test Cell.tsx", () => {
  it("Should Cell Colors and text are appropriate", () => {
    render(
      <StateContextProvider>
        <Cell idx={0} cell={{ value: 1, state: "CLOSE" }} />
        <Cell idx={1} cell={{ value: 2, state: "CLOSE" }} />
        <Cell idx={2} cell={{ value: 3, state: "CLOSE" }} />
        <Cell idx={3} cell={{ value: 4, state: "CLOSE" }} />
        <Cell idx={4} cell={{ value: 5, state: "CLOSE" }} />
        <Cell idx={5} cell={{ value: 6, state: "CLOSE" }} />
        <Cell idx={6} cell={{ value: 7, state: "CLOSE" }} />
        <Cell idx={7} cell={{ value: 8, state: "CLOSE" }} />
        <Cell idx={8} cell={{ value: 0, state: "CLOSE" }} />
        <Cell idx={9} cell={{ value: -1, state: "CLOSE" }} />
      </StateContextProvider>
    );
    expect(screen.getByText("1")).toHaveClass("text-blue-700");
    expect(screen.getByText("2")).toHaveClass("text-green-700");
    expect(screen.getByText("3")).toHaveClass("text-red-700");
    expect(screen.getByText("4")).toHaveClass("text-lime-700");
    expect(screen.getByText("5")).toHaveClass("text-orange-700");
    expect(screen.getByText("6")).toHaveClass("text-indigo-700");
    expect(screen.getByText("7")).toHaveClass("text-pink-700");
    expect(screen.getByText("8")).toHaveClass("text-stone-700");
    expect(screen.queryByText("0")).toBe(null);
    expect(screen.queryByText("-1")).toBe(null);
    expect(screen.getByText("B")).toHaveClass("bg-red-700");
  });
  it("Should closed Cell value is hidden", () => {
    render(
      <StateContextProvider>
        <Cell idx={0} cell={{ value: 1, state: "CLOSE" }} />
      </StateContextProvider>
    );
    expect(screen.getByTestId("cell-value-0")).toHaveClass("hidden");
    expect(screen.getByTestId("cell-flag-0")).toHaveClass("hidden");
  });
  it("Should opened Cell value is not hidden ", () => {
    render(
      <StateContextProvider>
        <Cell idx={0} cell={{ value: 1, state: "OPEN" }} />
      </StateContextProvider>
    );
    expect(screen.getByTestId("cell-value-0")).not.toHaveClass("hidden");
    expect(screen.getByTestId("cell-flag-0")).toHaveClass("hidden");
  });
  it("Should flaged Cell is not hidden ", () => {
    render(
      <StateContextProvider>
        <Cell idx={0} cell={{ value: 1, state: "FLAG" }} />
      </StateContextProvider>
    );
    expect(screen.getByTestId("cell-value-0")).toHaveClass("hidden");
    expect(screen.getByTestId("cell-flag-0")).not.toHaveClass("hidden");
  });
});
