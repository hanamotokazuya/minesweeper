import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import GameField from "../components/GameField";
import Result from "../components/Result";
import { useEffect, useState } from "react";
import { useInterval } from "../lib/useInterval";
import { useHotkeys } from "react-hotkeys-hook";
import {
  gameClearAction,
  refleshGameAction,
  switchFlagModeAction,
  timerCountAction,
  useGameSelector,
} from "redux/game";
import { useAppDispatch } from "redux/stores/store";

const MainPage: React.FC = () => {
  const {
    flagMode,
    countFlag,
    gameField: { mines },
    remainingCells,
    progress,
    time,
  } = useGameSelector();
  const dispatch = useAppDispatch();
  // ショートカットキーの割り当て
  useHotkeys("a", () => {
    dispatch(switchFlagModeAction());
  });
  useHotkeys("ctrl+c", () => {
    dispatch(refleshGameAction());
  });
  const [timerState, timerControl] = useInterval({
    interval: 1000,
    autostart: false,
    onUpdate: () => dispatch(timerCountAction()),
  });
  const [faceImage, setFaceImage] = useState("/niconico.png");
  useEffect(() => {
    // ゲームクリア条件
    if (remainingCells === mines && progress === "START") {
      dispatch(gameClearAction());
    }
    // タイマースタート条件
    if (timerState === "STOPPED" && progress === "START") {
      timerControl.start();
    }
    // タイマーストップ条件
    if (timerState === "RUNNING" && progress !== "START") {
      timerControl.stop();
    }
  });
  useEffect(() => {
    // faceイメージ切り替え条件
    if (progress === "READY") setFaceImage("/niconico.png");
    else if (progress === "GAMECLEAR") setFaceImage("/glass.png");
    else if (progress === "GAMEOVER") setFaceImage("/puapua.png");
  }, [progress]);

  return (
    <Layout>
      <div className="fixed top-0 left-0 bg-gray-500 p-4 flex justify-between items-center w-full h-13 z-10">
        <Link href="/">
          <a className="text-2xl text-green-400 font-bold w-20" data-testid="back-link">
            Menu
          </a>
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
            onClick={() => dispatch(refleshGameAction())}
          >
            <Image src={faceImage} alt="face" width={44} height={44} />
          </div>
          <div className="bg-black flex justify-center items-center w-16 h-11">
            <span className="text-red-500 text-2xl">{String(time).padStart(4, "0")}</span>
          </div>
        </div>
        <div className="w-20">
          <div
            className={`w-11 h-11 text-3xl flex justify-center items-center ${
              flagMode
                ? "bg-gray-400 border-gray-600 border"
                : "bg-gray-300 border-4 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600"
            }`}
            onClick={() => dispatch(switchFlagModeAction())}
          >
            🚩
          </div>
        </div>
      </div>
      <Result />
      <div className="w-screen pt-10 flex justify-center">
        <GameField />
      </div>
    </Layout>
  );
};

export default MainPage;
