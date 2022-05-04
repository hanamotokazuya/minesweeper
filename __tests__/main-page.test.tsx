import { render, screen } from "@testing-library/react";
import { getPage, initTestHelpers } from "next-page-tester";
import userEvent from "@testing-library/user-event";

initTestHelpers();

describe("Test main-page", () => {
  it("Should have the right number of cells for the game lavel", async () => {
    const { page } = await getPage({
      route: "/",
    });
    render(page);

    await userEvent.click(screen.getByTestId("start-link"));
    expect(await screen.findByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByTestId(/cell-\d+/).length).toBe(9 * 9);
    await userEvent.click(screen.getByTestId("back-link"));
    await userEvent.click(await screen.findByTestId("setting-link"));
    await userEvent.click(await screen.findByText("Normal ( 16 x 16 40 mines )"));
    await userEvent.click(screen.getByTestId("back-link"));
    await userEvent.click(await screen.findByTestId("start-link"));
    expect(await screen.findByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByTestId(/cell-\d+/).length).toBe(16 * 16);
    await userEvent.click(screen.getByTestId("back-link"));
    await userEvent.click(await screen.findByTestId("setting-link"));
    await userEvent.click(await screen.findByText("Hard ( 32 x 32 199 mines )"));
    await userEvent.click(screen.getByTestId("back-link"));
    await userEvent.click(await screen.findByTestId("start-link"));
    expect(await screen.findByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByTestId(/cell-\d+/).length).toBe(32 * 32);
  });
});
