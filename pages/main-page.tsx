import Layout from "../components/Layout";
import Link from "next/link";
import Cell from "../components/Cell";
import GameField from "../components/GameField";

const MainPage: React.FC = () => {
  return (
    <Layout>
      <div className="fixed top-0 left-0 bg-gray-500 p-4 flex justify-between items-center w-full h-12">
        <Link href="/">
          <a className="text-2xl text-green-400 font-bold">Menu</a>
        </Link>
        <div className="flex gap-2">
          <div className="bg-black flex items-center px-1 h-7">
            <span className="text-red-500">10</span>
          </div>
          <Cell />
          <div className="bg-black flex items-center px-1 h-7">
            <span className="text-red-500">10</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Cell />
          <Cell />
        </div>
      </div>
      <GameField />
    </Layout>
  );
};

export default MainPage;
