import { render, screen } from "@testing-library/react";
import Home from "../pages";

it("Should render Minesweeper text", () => {
  render(<Home />);
  expect(screen.getByText("Minesweeper")).toBeInTheDocument();
});
