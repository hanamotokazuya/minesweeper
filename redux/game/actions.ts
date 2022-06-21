import { Level } from "./types";

export const CHANGE_LEVEL = "CHANGE_LEVEL" as const;
export const changeLevelAction = (level: Level) => {
  return {
    type: CHANGE_LEVEL,
    payload: { level },
  };
};
export const SWITCH_FLAG_MODE = "SWITCH_FLAG_MODE" as const;
export const switchFlagModeAction = () => {
  return {
    type: SWITCH_FLAG_MODE,
  };
};
export const REFLESH_GAME = "REFLESH_GAME" as const;
export const refleshGameAction = () => {
  return {
    type: REFLESH_GAME,
  };
};
export const CHANGE_CELL_STATE = "CHANGE_CELL_STATE" as const;
export const changeCellStateAction = (idx: number) => {
  return {
    type: CHANGE_CELL_STATE,
    payload: { idx },
  };
};
export const OPEN_SURROUNDING_CELLS = "OPEN_SURROUNDING_CELLS" as const;
export const openSurroundingCellsAction = (pos: number) => {
  return {
    type: OPEN_SURROUNDING_CELLS,
    payload: { pos },
  };
};
export const GAMECLEAR = "GAMECLEAR" as const;
export const gameClearAction = () => {
  return {
    type: GAMECLEAR,
  };
};
export const GAMEOVER = "GAMEOVER" as const;
export const gameOverAction = () => {
  return {
    type: GAMEOVER,
  };
};
export const GAMESTART = "GAMESTART" as const;
export const gameStartAction = (pos: number) => {
  return {
    type: GAMESTART,
    payload: { pos },
  };
};
export const GAMERESULT = "GAMERESULT" as const;
export const gameResultAction = () => {
  return {
    type: GAMERESULT,
  };
};
export const TIMER_COUNT = "TIMER_COUNT" as const;
export const timerCountAction = () => {
  return {
    type: TIMER_COUNT,
  };
};
