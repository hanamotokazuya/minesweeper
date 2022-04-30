import Layout from "../components/Layout";
import Link from "next/link";
import Cell from "../components/Cell";
import GameField from "../components/GameField";
import { useStateContext } from "../context/StateContextProvider";

const MainPage: React.FC = () => {
  const {
    state: {
      flagMode,
      countFlag,
      gameField: { mines },
    },
    action,
  } = useStateContext();
  return (
    <Layout>
      <div className="fixed top-0 left-0 bg-gray-500 p-4 flex justify-between items-center w-full h-12">
        <Link href="/">
          <a className="text-2xl text-green-400 font-bold">Menu</a>
        </Link>
        <div className="flex gap-2">
          <div className="bg-black flex items-center px-1 h-7">
            <span className="text-red-500">{mines - countFlag}</span>
          </div>
          <Cell />
          <div className="bg-black flex items-center px-1 h-7">
            <span className="text-red-500">10</span>
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
      <div className="pt-20 pb-4">
        <GameField />
      </div>
    </Layout>
  );
};

export default MainPage;
