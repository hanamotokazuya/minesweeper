import Link from "next/link";
import { changeLevelAction, useGameSelector } from "redux/game";
import { useAppDispatch } from "redux/stores/store";
import Layout from "../components/Layout";

const SettingPage: React.FC = () => {
  const { level } = useGameSelector();
  const dispatch = useAppDispatch();
  return (
    <Layout>
      <Link href="/">
        <a className="text-3xl text-red-600 ml-10 mr-auto mb-10 pt-20" data-testid="back-link">
          Back
        </a>
      </Link>
      <h2 className="text-2xl text-green-400 mb-10">Game Level</h2>
      <button
        className={`${level === "Easy" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => dispatch(changeLevelAction("Easy"))}
      >
        Easy ( 9 x 9 10 mines )
      </button>
      <button
        className={`${level === "Normal" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => dispatch(changeLevelAction("Normal"))}
      >
        Normal ( 16 x 16 40 mines )
      </button>
      <button
        className={`${level === "Hard" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => dispatch(changeLevelAction("Hard"))}
      >
        Hard ( 32 x 32 199 mines )
      </button>
    </Layout>
  );
};

export default SettingPage;
