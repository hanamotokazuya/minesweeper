import { range, randomIntArrayNoDuplication } from "../lib/utils";

describe("Test utils range", () => {
  it("range(0,6) => [0,1,2,3,4,5]", () => {
    const answer = [0, 1, 2, 3, 4, 5];
    const result = range(0, 6);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("range(3,6) => [3,4,5]", () => {
    const answer = [3, 4, 5];
    const result = range(3, 6);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("range(1,2) => [1]", () => {
    const answer = [1];
    const result = range(1, 2);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("range(1,1) => []", () => {
    const answer: number[] = [];
    const result = range(1, 1);
    result.forEach((value, i) => {
      expect(value).toBe(answer[i]);
    });
  });
  it("Should throw error because of begin is bigger than end", () => {
    expect(() => range(5, 0)).toThrow("begin is bigger than end");
  });
});

describe("Test utils randomIntArrayNoDuplication", () => {
  let maxInt = 10;
  let arrayNum = 5;
  let exceptNum = [1, 3, 5, 7];
  it("Should number of returned array is arrayNum", () => {
    expect(randomIntArrayNoDuplication(maxInt, arrayNum).length).toBe(arrayNum);
    expect(randomIntArrayNoDuplication(maxInt, arrayNum, exceptNum).length).toBe(arrayNum);
  });
  it("Should a generated array must be unique", () => {
    let set = new Set(randomIntArrayNoDuplication(maxInt, arrayNum));
    expect(Array.from(set).length).toBe(arrayNum);
    set = new Set(randomIntArrayNoDuplication(maxInt, arrayNum, exceptNum));
    expect(Array.from(set).length).toBe(arrayNum);
  });
  it("Should throw error because of (maxInt - exceptNum.length) is bigger than arrayNum", () => {
    arrayNum = 11;
    expect(() => randomIntArrayNoDuplication(maxInt, arrayNum)).toThrow(
      "(maxInt - exceptNum.length) is bigger than arrayNum"
    );
    arrayNum = 7;
    expect(() => randomIntArrayNoDuplication(maxInt, arrayNum, exceptNum)).toThrow(
      "(maxInt - exceptNum.length) is bigger than arrayNum"
    );
  });
});
