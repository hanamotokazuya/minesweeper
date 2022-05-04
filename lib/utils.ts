/**
 * シーケンス配列を生成します．
 * @param begin 始点
 * @param end 終点
 * @returns [begin, end)に含まれる整数配列
 */
export const range = (begin: number, end: number) => {
  if (begin > end) throw new Error("begin is bigger than end");
  return [...Array(end - begin)].map((_, i) => begin + i);
};

/**
 * 重複のないランダムな整数配列を生成します．
 * @param maxInt 上限値
 * @param arrayNum 生成配列数
 * @param exceptNum 除外値配列
 * @returns [0, maxInt)に含まれる除外値を除いた重複のないランダムな整数配列
 */
export const randomIntArrayNoDuplication = (
  maxInt: number,
  arrayNum: number,
  exceptNum: number[] = []
) => {
  if (maxInt - exceptNum.length < arrayNum) {
    throw new Error("(maxInt - exceptNum.length) is bigger than arrayNum.");
  }
  // [0, maxInt)に含まれる整数配列を生成
  let sequenceArray = range(0, maxInt);
  // 除外値が指定されている場合，除外値を取り除く処理
  if (exceptNum.length > 0) {
    // 除外値配列を降順にソート
    let sortedExceptNum = exceptNum.sort((a, b) => b - a);
    if (sortedExceptNum[0] > maxInt - 1) {
      throw new Error("exceptNum elements are smaller than maxInt.");
    }
    // 除外値配列に従って，sequenceArrayから除外値を除外
    for (let i of sortedExceptNum) {
      sequenceArray.splice(i, 1);
    }
  }
  // ランダム整数配列の初期化
  let randomIntArray: number[] = [];
  // 重複なしランダム整数配列の生成処理
  for (let i = 0; i < arrayNum; i++) {
    let n = sequenceArray.length;
    let k = Math.floor(Math.random() * n);

    randomIntArray.push(sequenceArray[k]);
    sequenceArray.splice(k, 1);
  }
  return randomIntArray;
};
