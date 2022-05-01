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
      case "CHANGE_LEVEL_EVENT":
        return { ...state, level: action.level };
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
      case "SWITCH_FLAG_MODE_EVENT":
        return { ...state, flagMode: !state.flagMode };
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
      case "GAMECLEAR_EVENT":
        return { ...state, progress: "GAMECLEAR" };
      case "GAMEOVER_EVENT":
        return { ...state, progress: "GAMEOVER" };
      case "GAMESTART_EVENT":
        gameField = setGameField(state.gameField, action.pos);
        openCellIdx = searchOpenSurroundingCells(gameField.cells, gameField.rows, action.pos);
        for (let i of openCellIdx) {
          gameField.cells[i].state = "OPEN";
        }
        return {
          ...state,
          gameField,
          remainingCells: state.remainingCells - openCellIdx.length,
          progress: "START",
        };
      case "GAMERESULT_EVENT":
        gameField = _.cloneDeep(state.gameField);
        gameField.cells.forEach((_, i) => {
          gameField.cells[i].state = "OPEN";
        });
        return { ...state, gameField, progress: "RESULT" };
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

const initializeField = (level: Level): GameField => {
  let rows: number;
  let mines: number;
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
  const numOfCells = rows * rows;
  let cells = new Array(numOfCells).fill(null).map((e): Cell => ({ value: 0, state: "CLOSE" }));
  return { numOfCells, rows, mines, cells };
};

const setGameField = (initGameField: GameField, initPos: number): GameField => {
  const gameField = _.cloneDeep(initGameField);
  const numOfCells = gameField.numOfCells;
  const mines = gameField.mines;
  const rows = gameField.rows;
  let cells = gameField.cells;
  const surroundingCellsIdx = searchSurroundingCellIdx(initPos, rows, true);
  const minesPosition = randomIntArrayNoDuplication(numOfCells, mines, surroundingCellsIdx);
  console.log(minesPosition);
  for (let pos of minesPosition) {
    let surroundingCellsIdx = searchSurroundingCellIdx(pos, rows);
    cells[pos].value = -1;
    for (let i of surroundingCellsIdx) {
      cells[i].value += cells[i].value !== -1 ? 1 : 0;
    }
  }
  minesPosition.forEach((pos) => {});
  return { numOfCells, rows, mines, cells };
};

const searchOpenSurroundingCells = (
  cells: Cell[],
  rows: number,
  pos: number,
  init: number[] = [pos]
): number[] => {
  let canOpenCellIdx = init;
  let surroundingCellsIdx = searchSurroundingCellIdx(pos, rows);

  for (let i of surroundingCellsIdx) {
    if (cells[i].state === "CLOSE" && !canOpenCellIdx.includes(i)) {
      canOpenCellIdx.push(i);
      cells[i].value === 0 && searchOpenSurroundingCells(cells, rows, i, canOpenCellIdx);
    }
  }
  return canOpenCellIdx;
};

const searchSurroundingCellIdx = (pos: number, rows: number, includeSelf = false): number[] => {
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
