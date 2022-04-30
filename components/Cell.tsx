import { useState } from "react";
import { useStateContext } from "../context/StateContextProvider";
type Props = {
  content?: number;
};

const Cell: React.FC<Props> = ({ content }) => {
  let contentStyle = "";
  if (content === 1) {
    contentStyle = "text-blue-700";
  } else if (content === 2) {
    contentStyle = "text-green-700";
  } else if (content === 3) {
    contentStyle = "text-red-700";
  } else if (content === 4) {
    contentStyle = "text-lime-700";
  } else if (content === 5) {
    contentStyle = "text-orange-700";
  } else if (content === 6) {
    contentStyle = "text-indigo-700";
  } else if (content === 7) {
    contentStyle = "text-pink-700";
  } else if (content === 8) {
    contentStyle = "text-stone-700";
  }
  const {
    state: {
      flagMode,
      countFlag,
      gameField: { mines },
    },
    action,
  } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleClickCell = () => {
    if (flagMode) {
      if (!isOpen && !flag && countFlag < mines) {
        setFlag(true);
        action({ type: "COUNT_FLAG_EVENT", flag: true });
      } else if (flag) {
        setFlag(false);
        action({ type: "COUNT_FLAG_EVENT", flag: false });
      }
    } else {
      if (flag) {
        setFlag(false);
        action({ type: "COUNT_FLAG_EVENT", flag: false });
      } else if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  return (
    <div
      className={`w-11 h-11 text-3xl ${
        isOpen
          ? "bg-gray-400 border-gray-600 border"
          : "bg-gray-300 border-4 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600"
      }`}
      onClick={handleClickCell}
    >
      <div className={`${flag ? "flex justify-center items-center" : "hidden"}`}>🚩</div>
      <div
        className={`w-full h-full ${
          isOpen ? "flex justify-center items-center" : "hidden"
        } font-black`}
      >
        {(() => {
          if (content === 0) {
            return <div></div>;
          } else if (content === -1) {
            return (
              <div className="w-full h-full bg-red-700 flex justify-center items-center">B</div>
            );
          } else {
            return <div className={contentStyle}>{content}</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default Cell;
