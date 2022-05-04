import { render, screen } from "@testing-library/react";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import userEvent from "@testing-library/user-event";
import Home from "../pages";

initTestHelpers();

it("Should render Minesweeper text", () => {
  render(<Home />);
  expect(screen.getByText("Minesweeper")).toBeInTheDocument();
});

describe("Navigation by Link", () => {
  it("Should route to selected page in navigation", async () => {
    const { page } = await getPage({
      route: "/",
    });
    render(page);

    await userEvent.click(screen.getByTestId("start-link"));
    expect(await screen.findByText("Menu")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("back-link"));
    expect(await screen.findByText("Minesweeper")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("setting-link"));
    expect(await screen.findByText("Game Level")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("back-link"));
    expect(await screen.findByText("Minesweeper")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("help-link"));
    expect(await screen.findByText("遊び方")).toBeInTheDocument();
  });
});
