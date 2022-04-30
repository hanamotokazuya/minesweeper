import Head from "next/head";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Mine Sweeper</title>
      </Head>
      <main className="flex flex-col items-center">{children}</main>
    </>
  );
};

export default Layout;
