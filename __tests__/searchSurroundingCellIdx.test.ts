import { searchSurroundingCellIdx } from "context/StateContextProvider";

describe("Test searchSurroundingCellIdx", () => {
  it("Should number of surrounding cells in the upper left corner is 3", () => {
    const answer = [1, 9, 10];
    const result = searchSurroundingCellIdx(0, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the upper corner is 5", () => {
    const answer = [0, 2, 9, 10, 11];
    const result = searchSurroundingCellIdx(1, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the upper right corner is 3", () => {
    const answer = [7, 16, 17];
    const result = searchSurroundingCellIdx(8, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the left corner is 5", () => {
    const answer = [0, 1, 10, 18, 19];
    const result = searchSurroundingCellIdx(9, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the lower left corner is 3", () => {
    const answer = [63, 64, 73];
    const result = searchSurroundingCellIdx(72, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the lower corner is 5", () => {
    const answer = [63, 64, 65, 72, 74];
    const result = searchSurroundingCellIdx(73, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding cells in the lower right corner is 3", () => {
    const answer = [70, 71, 79];
    const result = searchSurroundingCellIdx(80, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should number of surrounding inner cells is 8", () => {
    const answer = [30, 31, 32, 39, 41, 48, 49, 50];
    const result = searchSurroundingCellIdx(40, 9).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should include self when includeSelf is true", () => {
    const answer = [30, 31, 32, 39, 40, 41, 48, 49, 50];
    const result = searchSurroundingCellIdx(40, 9, true).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
});
