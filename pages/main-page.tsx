import Layout from "../components/Layout";
import Link from "next/link";
import GameField from "../components/GameField";
import { useStateContext } from "../context/StateContextProvider";
import Result from "../components/Result";
import { useEffect } from "react";
import { useInterval } from "../lib/useInterval";
import { useHotkeys } from "react-hotkeys-hook";

const MainPage: React.FC = () => {
  const {
    state: {
      flagMode,
      countFlag,
      gameField: { mines },
      remainingCells,
      progress,
      time,
    },
    action,
  } = useStateContext();
  useHotkeys("a", () => action({ type: "SWITCH_FLAG_MODE_EVENT" }));
  useHotkeys("ctrl+c", () => action({ type: "REFLESH_GAME_EVENT" }));
  const [timerState, timerControl] = useInterval({
    interval: 1000,
    autostart: false,
    onUpdate: () => action({ type: "TIMER_COUNT_EVENT" }),
  });
  useEffect(() => {
    if (remainingCells === mines && progress === "START") {
      action({ type: "GAMECLEAR_EVENT" });
    }
  });
  useEffect(() => {
    if (timerState === "STOPPED" && progress === "START") {
      timerControl.start();
    }
    if (timerState === "RUNNING" && progress !== "START") {
      timerControl.stop();
    }
  });

  return (
    <Layout>
      <div className="fixed top-0 left-0 bg-gray-500 p-4 flex justify-between items-center w-full h-12">
        <Link href="/">
          <a className="text-2xl text-green-400 font-bold">Menu</a>
        </Link>
        <div className="flex gap-2">
          <div className="bg-black flex justify-center items-center w-16 h-11">
            <span className="text-red-500 text-2xl">
              {String(mines - countFlag).padStart(3, "0")}
            </span>
          </div>
          <div
            className="w-11 h-11 text-3xl flex justify-center items-center
              bg-gray-300 border-4 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600"
            onClick={() => action({ type: "REFLESH_GAME_EVENT" })}
          ></div>
          <div className="bg-black flex justify-center items-center w-16 h-11">
            <span className="text-red-500 text-2xl">{String(time).padStart(4, "0")}</span>
          </div>
        </div>
        <div
          className={`w-11 h-11 text-3xl flex justify-center items-center ${
            flagMode
              ? "bg-gray-400 border-gray-600 border"
              : "bg-gray-300 border-4 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600"
          }`}
          onClick={() => action({ type: "SWITCH_FLAG_MODE_EVENT" })}
        >
          🚩
        </div>
      </div>
      <Result />
      <div className="pt-20 pb-4">
        <GameField />
      </div>
    </Layout>
  );
};

export default MainPage;
