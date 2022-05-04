import { setGameField, initializeField } from "context/StateContextProvider";

describe("Test setGameField", () => {
  it("Should Easy mode set 10 mines", () => {
    const gameField = initializeField("Easy");
    const setField = setGameField(gameField, 40);
    expect(setField.cells[40].value).toBe(0);
    let mineCount = 0;
    setField.cells.forEach(({ value }) => {
      value === -1 && mineCount++;
    });
    expect(mineCount).toBe(10);
  });
  it("Should Normal mode set 40 mines", () => {
    const gameField = initializeField("Normal");
    const setField = setGameField(gameField, 40);
    expect(setField.cells[40].value).toBe(0);
    let mineCount = 0;
    setField.cells.forEach(({ value }) => {
      value === -1 && mineCount++;
    });
    expect(mineCount).toBe(40);
  });
  it("Should Hard mode set 199 mines", () => {
    const gameField = initializeField("Hard");
    const setField = setGameField(gameField, 40);
    expect(setField.cells[40].value).toBe(0);
    let mineCount = 0;
    setField.cells.forEach(({ value }) => {
      value === -1 && mineCount++;
    });
    expect(mineCount).toBe(199);
  });
});
