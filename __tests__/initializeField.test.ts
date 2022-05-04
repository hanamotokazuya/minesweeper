import { initializeField } from "context/StateContextProvider";

describe("Test initializeField", () => {
  it("Should Easy mode have 9 x 9 cells and 10 mines", () => {
    const result = initializeField("Easy");
    expect(result.numOfCells).toBe(9 * 9);
    expect(result.rows).toBe(9);
    expect(result.mines).toBe(10);
    result.cells.forEach(({ value, state }) => {
      expect(value).toBe(0);
      expect(state).toBe("CLOSE");
    });
  });
  it("Should Normal mode have 16 x 16 cells and 40 mines", () => {
    const result = initializeField("Normal");
    expect(result.numOfCells).toBe(16 * 16);
    expect(result.rows).toBe(16);
    expect(result.mines).toBe(40);
    result.cells.forEach(({ value, state }) => {
      expect(value).toBe(0);
      expect(state).toBe("CLOSE");
    });
  });
  it("Should Hard mode have 32 x 32 cells and 199 mines", () => {
    const result = initializeField("Hard");
    expect(result.numOfCells).toBe(32 * 32);
    expect(result.rows).toBe(32);
    expect(result.mines).toBe(199);
    result.cells.forEach(({ value, state }) => {
      expect(value).toBe(0);
      expect(state).toBe("CLOSE");
    });
  });
});
