export const range = (begin: number, end: number) =>
  [...Array(end - begin)].map((_, i) => begin + i);

export const randomIntArrayNoDuplication = (maxInt: number, arrayNum: number) => {
  if (maxInt < arrayNum) throw new Error("maxInt is bigger than arrayNum.");
  let sequenceArray = range(0, maxInt);
  let randomIntArray: number[] = [];
  for (let i = 0; i < arrayNum; i++) {
    let n = sequenceArray.length;
    let k = Math.floor(Math.random() * n);

    randomIntArray.push(sequenceArray[k]);
    sequenceArray.splice(k, 1);
  }
  return randomIntArray;
};
