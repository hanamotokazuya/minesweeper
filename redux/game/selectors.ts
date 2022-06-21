import { useSelector } from "react-redux";
import { RootState } from "redux/stores";

const gameSelector = (state: RootState) => state.game;

export const useGameSelector = () => useSelector(gameSelector);
