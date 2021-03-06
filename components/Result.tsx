import { gameResultAction, useGameSelector } from "redux/game";
import { useAppDispatch } from "redux/stores/store";

/**
 * ゲームクリア画面およびゲームオーバー画面を表示するコンポーネント
 */
const Result: React.FC = () => {
  const { progress, time } = useGameSelector();
  const dispatch = useAppDispatch();

  return (
    <>
      {progress === "GAMECLEAR" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-20"
          onClick={() => dispatch(gameResultAction())}
        >
          <div className="w-full h-full bg-gray-500 opacity-50"></div>
          <div className="min-w-max absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-3xl bg-black p-8 sm:p-15">
            <div className="text-2xl sm:text-3xl text-green-500 text-center">GAME CLEAR!!!</div>
            <div className="sm:text-lg text-gray-300 text-center">Time: {time} [sec]</div>
          </div>
        </div>
      )}
      {progress === "GAMEOVER" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-20"
          onClick={() => dispatch(gameResultAction())}
        >
          <div className="w-full h-full bg-gray-500 opacity-50"></div>
          <div className="min-w-max absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-3xl bg-black p-8 sm:p-15">
            <div className="text-2xl sm:text-3xl text-red-600 text-center">GAME OVER!!!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
