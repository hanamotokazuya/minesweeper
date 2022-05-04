import { searchOpenSurroundingCells } from "context/StateContextProvider";
import { Cell } from "types/state";

describe("Test searchOpenSurroundingCells", () => {
  it("Should search for expandable cells", () => {
    //  1  1  1
    //  1  x  1
    //  1  1  1
    const cells: Cell[] = [
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 0, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
    ];
    const answer = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const result = searchOpenSurroundingCells(cells, 3, 4).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should except opened cells", () => {
    //  1  1  1
    //  1  x  1
    //  1  1  1
    const cells: Cell[] = [
      { value: 1, state: "OPEN" },
      { value: 1, state: "OPEN" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 0, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
    ];
    const answer = [2, 3, 4, 5, 6, 7, 8];
    const result = searchOpenSurroundingCells(cells, 3, 4).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should except flagged cells", () => {
    //  1  1  1
    //  1  x  1
    //  1  1  1
    const cells: Cell[] = [
      { value: 1, state: "FLAG" },
      { value: 1, state: "FLAG" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 0, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
    ];
    const answer = [2, 3, 4, 5, 6, 7, 8];
    const result = searchOpenSurroundingCells(cells, 3, 4).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should search recursively", () => {
    //  1  1  1  1
    //  1  x  0  1
    //  1  1  1  1
    //  1  1  1  1
    const cells: Cell[] = [
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 0, state: "CLOSE" },
      { value: 0, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
      { value: 1, state: "CLOSE" },
    ];
    const answer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const result = searchOpenSurroundingCells(cells, 4, 5).sort((a, b) => a - b);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
});
