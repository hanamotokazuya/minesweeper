import Link from "next/link";
import Layout from "../components/Layout";
import { useStateContext } from "../context/StateContextProvider";

const SettingPage: React.FC = () => {
  const {
    state: { level },
    action,
  } = useStateContext();
  return (
    <Layout>
      <Link href="/">
        <a className="text-3xl text-red-600 ml-10 mr-auto mb-10 pt-20">Back</a>
      </Link>
      <h2 className="text-2xl text-green-400 mb-10">Game Level</h2>
      <button
        className={`${level === "Easy" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => action({ type: "CHANGE_LEVEL_EVENT", level: "Easy" })}
      >
        Easy ( 9 x 9 10 mines )
      </button>
      <button
        className={`${level === "Normal" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => action({ type: "CHANGE_LEVEL_EVENT", level: "Normal" })}
      >
        Normal ( 16 x 16 40 mines )
      </button>
      <button
        className={`${level === "Hard" ? "text-red-400" : "text-gray-300"} text-xl mb-10`}
        onClick={() => action({ type: "CHANGE_LEVEL_EVENT", level: "Hard" })}
      >
        Hard ( 32 x 32 199 mines )
      </button>
    </Layout>
  );
};

export default SettingPage;
