import { useStateContext } from "../context/StateContextProvider";

const Result: React.FC = () => {
  const {
    state: { progress },
    action,
  } = useStateContext();
  return (
    <>
      {progress === "GAMECLEAR" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={() => action({ type: "GAMERESULT_EVENT" })}
        >
          <div className="w-full h-full bg-gray-500 opacity-50"></div>
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-3xl bg-black p-20">
            <div className="text-6xl text-green-500">GAME CLEAR!!!</div>
          </div>
        </div>
      )}
      {progress === "GAMEOVER" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={() => action({ type: "GAMERESULT_EVENT" })}
        >
          <div className="w-full h-full bg-gray-500 opacity-50"></div>
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-3xl bg-black p-20">
            <div className="text-6xl text-red-600">GAME OVER!!!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
