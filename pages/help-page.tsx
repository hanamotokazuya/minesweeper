import Layout from "../components/Layout";
import Link from "next/link";

const HelpPage: React.FC = () => {
  return (
    <Layout>
      <Link href="/">
        <a className="text-3xl text-red-600 ml-10 mr-auto mb-10 pt-20" data-testid="back-link">
          Back
        </a>
      </Link>
      <h2 className="text-2xl text-green-400 mb-10">遊び方</h2>
      <h3 className="text-gray-300 text-xl font-bold mb-2">【ルール】</h3>
      <p className="text-gray-300 sm:text-xl mb-2 text-center">
        マス目を開いていき、地雷マスを除いたすべてのマス目を開くとクリア！
        <br /> 地雷マスを開くとゲームオーバー！
      </p>
      <h3 className="text-gray-300 text-xl font-bold mb-2">【数字の意味】</h3>
      <p className="text-gray-300 sm:text-xl mb-2">
        隣接するマス目に地雷が何個あるかを表しています。
      </p>
      <h3 className="text-gray-300 text-xl font-bold mb-2">【地雷がある場所には旗を立てよう！】</h3>
      <p className="text-gray-300 sm:text-xl text-center mb-2">
        爆弾の位置が特定できるときは、旗を立ててマス目を開けないようにしましょう。
        <br />
        ゲーム画面右上の🚩マークのついたボタンを押すとフラグモードに切り替わります。
        <br />
        フラグモードの状態でマス目をクリック(タッチ)すると旗が立ちます。
      </p>
      <h3 className="text-gray-300 text-xl font-bold mb-2">【便利ショートカットキー】</h3>
      <p className="text-gray-300 sm:text-xl">a: フラグモードの切り替えができます。</p>
      <p className="text-gray-300 sm:text-xl">ctrl(cmd)+c: ゲームをリスタートできます。</p>
    </Layout>
  );
};
export default HelpPage;
