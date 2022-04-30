export type Level = "Easy" | "Normal" | "Hard";

export type Cell = number;

export type GameField = {
  numOfCells: number;
  rows: number;
  mines: number;
  cells: Cell[];
};

export type State = {
  level: Level;
  flagMode: boolean;
  gameField: GameField;
};
export type Action = CHANGE_LEVEL_EVENT | SWTICH_FLAG_MODE_EVENT | REFLESH_GAME_FIELD_EVENT;

type CHANGE_LEVEL_EVENT = {
  type: "CHANGE_LEVEL_EVENT";
  level: Level;
};
type SWTICH_FLAG_MODE_EVENT = {
  type: "SWITCH_FLAG_MODE_EVENT";
};
type REFLESH_GAME_FIELD_EVENT = {
  type: "REFLESH_GAME_FIELD_EVENT";
};
