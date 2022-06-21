import {
  changeLevelAction,
  switchFlagModeAction,
  refleshGameAction,
  changeCellStateAction,
  openSurroundingCellsAction,
  gameClearAction,
  gameOverAction,
  gameStartAction,
  gameResultAction,
  timerCountAction,
} from "./actions";

export type GameType = {
  state: GameStateType;
  action: GameActionType;
};

type GameStateType = {
  level: Level;
  flagMode: boolean;
  gameField: GameField;
  countFlag: number;
  remainingCells: number;
  progress: Progress;
  time: number;
};
type GameActionType = ReturnType<
  | typeof changeLevelAction
  | typeof switchFlagModeAction
  | typeof refleshGameAction
  | typeof changeCellStateAction
  | typeof openSurroundingCellsAction
  | typeof gameClearAction
  | typeof gameOverAction
  | typeof gameStartAction
  | typeof gameResultAction
  | typeof timerCountAction
>;

export type Level = "Easy" | "Normal" | "Hard";

export type CellState = "CLOSE" | "OPEN" | "FLAG";
export type Cell = {
  value: number;
  state: CellState;
};
export type GameField = {
  numOfCells: number;
  rows: number;
  mines: number;
  cells: Cell[];
};
export type Progress = "READY" | "START" | "GAMECLEAR" | "GAMEOVER" | "RESULT";
