import type { NextPage } from "next";
import Head from "next/head";
import Game from "../components/Game";
import { GameProvider } from "../hooks/useGame";
import useWindowSize from "../hooks/useWindowSize";

const Home: NextPage = () => {
  const { height } = useWindowSize();
  return (
    <div
      className="fixed  w-full flex bg-zinc-800 p-5"
      style={{
        height: `${height}px`,
      }}
    >
      <Head>
        <title>Flowpepe</title>
        <link rel="icon" href="pepe.gif" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
};

export default Home;
