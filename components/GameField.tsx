import { useStateContext } from "../context/StateContextProvider";
import Cell from "../components/Cell";

const GameField: React.FC = () => {
  const {
    state: { level, gameField },
  } = useStateContext();
  const cells = gameField.cells;
  let gridPattern = "grid-cols-9";
  if (level === "Easy") gridPattern = "grid-cols-9 w-[396px]";
  if (level === "Normal") gridPattern = "grid-cols-16 w-[704px]";
  if (level === "Hard") gridPattern = "grid-cols-32 w-[1408px]";

  return (
    <div className={`overflow-x-scroll scrollbar-hide grid ${gridPattern} py-10 mx-6`}>
      {cells.map((cell, idx) => (
        <Cell key={idx} idx={idx} cell={cell} />
      ))}
    </div>
  );
};

export default GameField;
