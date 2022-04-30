import { useStateContext } from "../context/StateContextProvider";
import Cell from "../components/Cell";
import { Level } from "../types/state";
import { randomIntArrayNoDuplication } from "../lib/utils";

const GameField: React.FC = () => {
  const {
    state: { level, gameField },
  } = useStateContext();
  const cells = gameField.cells;
  let gridPattern = "grid-cols-9";
  if (level === "Easy") gridPattern = "grid-cols-9";
  if (level === "Normal") gridPattern = "grid-cols-16";
  if (level === "Hard") gridPattern = "grid-cols-32";

  return (
    <div className={`grid ${gridPattern} mt-1`}>
      {cells.map((cell, key) => (
        <Cell key={key} content={cell} />
      ))}
    </div>
  );
};

export default GameField;

type Cell = number;
type GameField = {
  numOfCells: number;
  rows: number;
  mines: number;
  cells: Cell[];
};
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
