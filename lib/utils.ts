export const range = (begin: number, end: number) => {
  if (begin > end) throw new Error("begin is bigger than end");
  return [...Array(end - begin)].map((_, i) => begin + i);
};

export const randomIntArrayNoDuplication = (
  maxInt: number,
  arrayNum: number,
  exceptNum: number[] = []
) => {
  if (maxInt - exceptNum.length < arrayNum) {
    throw new Error("(maxInt - exceptNum.length) is bigger than arrayNum.");
  }
  let sequenceArray = range(0, maxInt);
  if (exceptNum.length > 0) {
    let sortedExceptNum = exceptNum.sort((a, b) => b - a);
    if (sortedExceptNum[0] > maxInt - 1) {
      throw new Error("exceptNum elements are smaller than maxInt.");
    }
    for (let i of sortedExceptNum) {
      sequenceArray.splice(i, 1);
    }
  }

  let randomIntArray: number[] = [];
  for (let i = 0; i < arrayNum; i++) {
    let n = sequenceArray.length;
    let k = Math.floor(Math.random() * n);

    randomIntArray.push(sequenceArray[k]);
    sequenceArray.splice(k, 1);
  }
  return randomIntArray;
};
