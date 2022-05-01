import { useContext, createContext, useReducer } from "react";
import { Level, Cell, GameField, State, Action } from "../types/state";
import { randomIntArrayNoDuplication } from "../lib/utils";

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
    let countFlag = state.countFlag;
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
      case "COUNT_FLAG_EVENT":
        const flag = action.flag ? 1 : -1;
        countFlag += flag;
        return { ...state, countFlag };
      case "COUNT_CELL_EVENT":
        if (state.remainingCells > state.gameField.mines) {
          return { ...state, remainingCells: state.remainingCells - 1 };
        }
      case "GAMECLEAR_EVENT":
        return { ...state, progress: "GAMECLEAR" };
      case "GAMEOVER_EVENT":
        return { ...state, progress: "GAMEOVER" };
      case "GAMESTART_EVENT":
        return { ...state, progress: "START" };
      case "GAMERESULT_EVENT":
        return { ...state, progress: "RESULT" };
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
  let cells = new Array<Cell>(numOfCells).fill(0);
  const minesPosition = randomIntArrayNoDuplication(numOfCells, mines);
  minesPosition.forEach((pos) => {
    let row = Math.floor(pos / rows);
    let col = pos % rows;
    cells[pos] = -1;
    if (col !== 0 && cells[pos - 1] !== -1) {
      cells[pos - 1] += 1;
    }
    if (col !== rows - 1 && cells[pos + 1] !== -1) {
      cells[pos + 1] += 1;
    }
    if (row !== 0 && cells[pos - rows] !== -1) {
      cells[pos - rows] += 1;
    }
    if (row !== 0 && col !== 0 && cells[pos - rows - 1] !== -1) {
      cells[pos - rows - 1] += 1;
    }
    if (row !== 0 && col !== rows - 1 && cells[pos - rows + 1] !== -1) {
      cells[pos - rows + 1] += 1;
    }
    if (row !== rows - 1 && cells[pos + rows] !== -1) {
      cells[pos + rows] += 1;
    }
    if (row !== rows - 1 && col !== 0 && cells[pos + rows - 1] !== -1) {
      cells[pos + rows - 1] += 1;
    }
    if (row !== rows - 1 && col !== rows - 1 && cells[pos + rows + 1] !== -1) {
      cells[pos + rows + 1] += 1;
    }
  });
  return { numOfCells, rows, mines, cells };
};
