import {
  changeCellStateAction,
  gameOverAction,
  gameStartAction,
  openSurroundingCellsAction,
  useGameSelector,
} from "redux/game";
import { useAppDispatch } from "redux/stores/store";
import { Cell } from "../types/state";
type Props = {
  idx: number;
  cell: Cell;
};
/**
 * セル単体を生成するコンポーネント
 * @param {`{ idx, cell }` }
 */
const Cell: React.FC<Props> = ({ idx, cell }) => {
  let contentStyle = "";
  if (cell.value === 1) contentStyle = "text-blue-700";
  else if (cell.value === 2) contentStyle = "text-green-700";
  else if (cell.value === 3) contentStyle = "text-red-700";
  else if (cell.value === 4) contentStyle = "text-lime-700";
  else if (cell.value === 5) contentStyle = "text-orange-700";
  else if (cell.value === 6) contentStyle = "text-indigo-700";
  else if (cell.value === 7) contentStyle = "text-pink-700";
  else if (cell.value === 8) contentStyle = "text-stone-700";

  const { flagMode, progress } = useGameSelector();
  const dispatch = useAppDispatch();

  const handleClickCell = () => {
    if (progress === "READY") {
      dispatch(gameStartAction(idx));
    } else if (progress === "START") {
      dispatch(changeCellStateAction(idx));
      if (!flagMode && cell.state === "CLOSE") {
        cell.value === 0 && dispatch(openSurroundingCellsAction(idx));
        cell.value === -1 && dispatch(gameOverAction());
      }
    }
  };

  return (
    <div
      className={`w-11 h-11 text-3xl ${
        cell.state === "OPEN"
          ? "bg-gray-400 border-gray-600 border"
          : "bg-gray-300 border-4 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600"
      }`}
      data-testid={`cell-${idx}`}
      onClick={handleClickCell}
    >
      <div
        className={`${cell.state === "FLAG" ? "flex justify-center items-center" : "hidden"}`}
        data-testid={`cell-flag-${idx}`}
      >
        🚩
      </div>
      <div
        className={`w-full h-full ${
          cell.state === "OPEN" ? "flex justify-center items-center" : "hidden"
        } font-black`}
        data-testid={`cell-value-${idx}`}
      >
        {(() => {
          if (cell.value === 0) {
            return <div></div>;
          } else if (cell.value === -1) {
            return (
              <div className="w-full h-full bg-red-700 flex justify-center items-center">B</div>
            );
          } else {
            return <div className={contentStyle}>{cell.value}</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default Cell;
