import { useContext, createContext, useReducer } from "react";
import { Level, Cell, GameField, State, Action } from "../types/state";
import { randomIntArrayNoDuplication } from "../lib/utils";
import _ from "lodash";

interface Props {
  children: React.ReactNode;
}

const StateContext = createContext(
  {} as {
    state: State;
    action: React.Dispatch<Action>;
  }
);

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const events = (state: State, action: Action): State => {
    let openCellIdx: number[];
    let gameField: GameField;
    switch (action.type) {
      // Game Levelを更新するアクション
      case "CHANGE_LEVEL_EVENT":
        return { ...state, level: action.level };
      // Game をリセットするアクション
      case "REFLESH_GAME_EVENT":
        gameField = initializeField(state.level);
        return {
          ...state,
          gameField,
          countFlag: 0,
          flagMode: false,
          remainingCells: gameField.numOfCells,
          progress: "READY",
          time: 0,
        };
      // フラグモードの切り替えを行うアクション
      case "SWITCH_FLAG_MODE_EVENT":
        return { ...state, flagMode: !state.flagMode };
      // セルの状態を変更するアクション
      case "CHANGE_CELL_STATE_EVENT":
        gameField = _.cloneDeep(state.gameField);
        const cellState = state.gameField.cells[action.idx].state;
        let countFlag = state.countFlag;
        let remainingCells = state.remainingCells;
        let newCellState = gameField.cells[action.idx].state;
        if (cellState === "CLOSE" && state.flagMode && state.countFlag < gameField.mines) {
          newCellState = "FLAG";
          countFlag += 1;
        } else if (cellState === "FLAG") {
          newCellState = "CLOSE";
          countFlag -= 1;
        } else if (cellState === "CLOSE" && !state.flagMode) {
          newCellState = "OPEN";
          remainingCells -= 1;
        }
        gameField.cells[action.idx].state = newCellState;
        return { ...state, gameField, countFlag, remainingCells };
      // 開いたセルの周辺で展開可能なセルを開くアクション
      case "OPEN_SURROUNDING_CELLS_EVENT":
        gameField = _.cloneDeep(state.gameField);
        openCellIdx = searchOpenSurroundingCells(gameField.cells, gameField.rows, action.pos);
        for (let i of openCellIdx) {
          gameField.cells[i].state = "OPEN";
        }
        return {
          ...state,
          gameField,
          remainingCells: state.remainingCells - (openCellIdx.length - 1),
        };
      // ゲームクリアに遷移するアクション
      case "GAMECLEAR_EVENT":
        return { ...state, progress: "GAMECLEAR" };
      // ゲームオーバーに遷移するアクション
      case "GAMEOVER_EVENT":
        return { ...state, progress: "GAMEOVER" };
      // ゲームスタートに遷移するアクション
      case "GAMESTART_EVENT":
        // ゲーム盤に地雷を生成
        gameField = setGameField(state.gameField, action.pos);
        // 周辺展開可能セルのインデックスを抽出
        openCellIdx = searchOpenSurroundingCells(gameField.cells, gameField.rows, action.pos);
        // 周辺展開可能セルを展開する処理
        for (let i of openCellIdx) {
          gameField.cells[i].state = "OPEN";
        }
        return {
          ...state,
          gameField,
          remainingCells: state.remainingCells - openCellIdx.length,
          progress: "START",
        };
      // ゲームリザルトに遷移するアクション
      case "GAMERESULT_EVENT":
        gameField = _.cloneDeep(state.gameField);
        // ゲーム盤のセルをすべて展開する処理
        gameField.cells.forEach((_, i) => {
          gameField.cells[i].state = "OPEN";
        });
        return { ...state, gameField, progress: "RESULT" };
      // タイマーの秒数をインクリメントするアクション
      case "TIMER_COUNT_EVENT":
        return { ...state, time: state.time + 1 };
      default:
        return state;
    }
  };
  const initialState: State = {
    level: "Easy",
    flagMode: false,
    gameField: initializeField("Easy"),
    countFlag: 0,
    remainingCells: 81,
    progress: "READY",
    time: 0,
  };
  const [state, action] = useReducer(events, initialState);
  return <StateContext.Provider value={{ state, action }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);

/**
 * ゲーム盤をゲームレベルに基づいて初期化を行う．
 * ただし，地雷はセットしない．
 * @param level ゲームレベル("Easy" or "Normal" or "Hard")
 * @returns `{numOfCells, rows, mines, cells}`
 */
export const initializeField = (level: Level): GameField => {
  let rows: number;
  let mines: number;
  // ゲーム盤の行数と地雷数を定義
  switch (level) {
    case "Easy":
      rows = 9;
      mines = 10;
      break;
    case "Normal":
      rows = 16;
      mines = 40;
      break;
    case "Hard":
      rows = 32;
      mines = 199;
      break;
    default:
      rows = 9;
      mines = 10;
  }
  // セル数を算出
  const numOfCells = rows * rows;
  // すべてのセルを{ value: 0, state: "CLOSE" }で初期化
  let cells = new Array(numOfCells).fill(null).map((e): Cell => ({ value: 0, state: "CLOSE" }));
  return { numOfCells, rows, mines, cells };
};

/**
 * ゲーム開始位置に基づいて，ゲーム盤に地雷をセットします．
 * 仕様として，ゲーム開始位置周辺には地雷をセットしません．
 * @param initGameField 初期化済みゲーム盤
 * @param initPos ゲーム開始位置
 * @returns `{ numOfCells, rows, mines, cells }`
 */
export const setGameField = (initGameField: GameField, initPos: number): GameField => {
  const gameField = _.cloneDeep(initGameField);
  const numOfCells = gameField.numOfCells;
  const mines = gameField.mines;
  const rows = gameField.rows;
  let cells = gameField.cells;
  // ゲーム開始位置周辺のセルインデックスを抽出
  const surroundingCellsIdx = searchSurroundingCellIdx(initPos, rows, true);
  // ゲーム開始位置周辺のセルを除いたセルに地雷をセットするための地雷の位置を決定
  const minesPosition = randomIntArrayNoDuplication(numOfCells, mines, surroundingCellsIdx);
  // 地雷の位置に基づいて，ゲーム盤に地雷をセットする処理
  for (let pos of minesPosition) {
    let surroundingCellsIdx = searchSurroundingCellIdx(pos, rows);
    cells[pos].value = -1;
    for (let i of surroundingCellsIdx) {
      cells[i].value += cells[i].value !== -1 ? 1 : 0;
    }
  }
  return { numOfCells, rows, mines, cells };
};

/**
 * 展開可能なセルのインデックスを探索します．
 * @param cells ゲーム盤のセル配列
 * @param rows ゲーム盤の行数
 * @param pos 探索の起点
 * @param init 展開可能セルの初期値
 * @returns 展開可能なセルのインデックス配列
 */
export const searchOpenSurroundingCells = (
  cells: Cell[],
  rows: number,
  pos: number,
  init: number[] = [pos]
): number[] => {
  // 展開可能セルのインデックス配列の参照渡し
  let canOpenCellIdx = init;
  // 周辺のセルインデックスを抽出
  let surroundingCellsIdx = searchSurroundingCellIdx(pos, rows);

  // 周辺のセルに対して探索する処理
  for (let i of surroundingCellsIdx) {
    // セルの状態がCLOSEかつ展開可能セルインデックス配列にまだ含まれていないならば，これを含める
    if (cells[i].state === "CLOSE" && !canOpenCellIdx.includes(i)) {
      canOpenCellIdx.push(i);
      // 探索したセルの周辺に地雷が存在しないならば，このセルを起点として再帰的に探索する．
      cells[i].value === 0 && searchOpenSurroundingCells(cells, rows, i, canOpenCellIdx);
    }
  }
  return canOpenCellIdx;
};

/**
 * 周辺のセルインデックスを探索します
 * @param pos 起点のセル
 * @param rows ゲーム盤の行数
 * @param includeSelf 戻り値に起点のセルインデックスを含めるかどうかのオプション
 * @returns 周辺のセルインデックス配列
 */
export const searchSurroundingCellIdx = (
  pos: number,
  rows: number,
  includeSelf = false
): number[] => {
  let surroundingCellsIdx: number[] = [];
  const row = Math.floor(pos / rows);
  const col = pos % rows;
  if (col !== 0) surroundingCellsIdx.push(pos - 1);
  if (col !== rows - 1) surroundingCellsIdx.push(pos + 1);
  if (row !== 0) surroundingCellsIdx.push(pos - rows);
  if (row !== rows - 1) surroundingCellsIdx.push(pos + rows);
  if (col !== 0 && row !== 0) surroundingCellsIdx.push(pos - rows - 1);
  if (col !== 0 && row !== rows - 1) surroundingCellsIdx.push(pos + rows - 1);
  if (col !== rows - 1 && row !== 0) surroundingCellsIdx.push(pos - rows + 1);
  if (col !== rows - 1 && row !== rows - 1) surroundingCellsIdx.push(pos + rows + 1);
  includeSelf && surroundingCellsIdx.push(pos);

  return surroundingCellsIdx;
};
