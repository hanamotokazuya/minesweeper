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
export type State = {
  level: Level;
  flagMode: boolean;
  gameField: GameField;
  countFlag: number;
  remainingCells: number;
  progress: Progress;
  time: number;
};
export type Action =
  | CHANGE_LEVEL_EVENT
  | SWTICH_FLAG_MODE_EVENT
  | REFLESH_GAME_EVENT
  | CHANGE_CELL_STATE_EVENT
  | OPEN_SURROUNDING_CELLS_EVENT
  | COUNT_FLAG_EVENT
  | COUNT_CELL_EVENT
  | GAMECLEAR_EVENT
  | GAMEOVER_EVENT
  | GAMESTART_EVENT
  | GAMERESULT_EVENT
  | TIMER_COUNT_EVENT;

type CHANGE_LEVEL_EVENT = {
  type: "CHANGE_LEVEL_EVENT";
  level: Level;
};
type SWTICH_FLAG_MODE_EVENT = {
  type: "SWITCH_FLAG_MODE_EVENT";
};
type REFLESH_GAME_EVENT = {
  type: "REFLESH_GAME_EVENT";
};
type CHANGE_CELL_STATE_EVENT = {
  type: "CHANGE_CELL_STATE_EVENT";
  idx: number;
};
type OPEN_SURROUNDING_CELLS_EVENT = {
  type: "OPEN_SURROUNDING_CELLS_EVENT";
  pos: number;
};
type COUNT_FLAG_EVENT = {
  type: "COUNT_FLAG_EVENT";
  flag: boolean;
};
type COUNT_CELL_EVENT = {
  type: "COUNT_CELL_EVENT";
};
type GAMECLEAR_EVENT = {
  type: "GAMECLEAR_EVENT";
};
type GAMEOVER_EVENT = {
  type: "GAMEOVER_EVENT";
};
type GAMESTART_EVENT = {
  type: "GAMESTART_EVENT";
  pos: number;
};
type GAMERESULT_EVENT = {
  type: "GAMERESULT_EVENT";
};
type TIMER_COUNT_EVENT = {
  type: "TIMER_COUNT_EVENT";
};
