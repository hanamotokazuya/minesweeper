import { render, screen } from "@testing-library/react";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import userEvent from "@testing-library/user-event";

initTestHelpers();

it("Should set the game level appropriately", async () => {
  const { page } = await getPage({
    route: "/setting-page",
  });
  render(page);
  const EasyElement = screen.getByText("Easy ( 9 x 9 10 mines )");
  const NormalElement = screen.getByText("Normal ( 16 x 16 40 mines )");
  const HardElement = screen.getByText("Hard ( 32 x 32 199 mines )");

  expect(EasyElement).toHaveClass("text-red-400");
  expect(NormalElement).toHaveClass("text-gray-300");
  expect(HardElement).toHaveClass("text-gray-300");

  await userEvent.click(NormalElement);
  expect(EasyElement).toHaveClass("text-gray-300");
  expect(NormalElement).toHaveClass("text-red-400");
  expect(HardElement).toHaveClass("text-gray-300");

  await userEvent.click(HardElement);
  expect(EasyElement).toHaveClass("text-gray-300");
  expect(NormalElement).toHaveClass("text-gray-300");
  expect(HardElement).toHaveClass("text-red-400");

  await userEvent.click(EasyElement);
  expect(EasyElement).toHaveClass("text-red-400");
  expect(NormalElement).toHaveClass("text-gray-300");
  expect(HardElement).toHaveClass("text-gray-300");
});
