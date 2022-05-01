import type { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import { useStateContext } from "../context/StateContextProvider";

const Home: NextPage = () => {
  const { action } = useStateContext();
  return (
    <Layout>
      <h1 className="text-4xl text-green-400 mb-10 pt-20 text-center">Minesweeper</h1>
      <Link href="/main-page">
        <a
          className="text-2xl text-white mb-10 hover:text-red-400"
          onClick={() => action({ type: "REFLESH_GAME_EVENT" })}
        >
          Start
        </a>
      </Link>
      <Link href="/setting-page">
        <a className="text-2xl text-white mb-10 hover:text-red-400">Setting</a>
      </Link>
      <Link href="/help-page">
        <a className="text-2xl text-white mb-10 hover:text-red-400">Help</a>
      </Link>
    </Layout>
  );
};

export default Home;
