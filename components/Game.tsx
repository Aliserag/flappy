import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FlappyBird from "./FlappyBird";
import Footer from "./Footer";
import Background from "./Background";
import useGame from "../hooks/useGame";
import Pipes from "./Pipes";
import useElementSize from "../hooks/useElementSize";
import _ from "lodash";

export default function Game() {
  const { handleWindowClick, startGame, isReady, isStarted, rounds } =
    useGame();
  const [ref, window] = useElementSize();
  const [isMuted, setIsMuted] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // State for intro screen
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (window.width > 0 && window.height > 0) {
      startGame(window);
    }
  }, [window, ref]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      if (isStarted && !isMuted) {
        audioRef.current.play().catch((error) => console.log(error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isStarted, isMuted]);

  const handleStartClick = () => {
    setShowIntro(false);
    handleWindowClick(); // Start the game on first click
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <audio ref={audioRef} src="/jeet.m4a" />
      {showIntro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-90 p-4 z-50">
          <h1
            className="text-white text-6xl font-bold mb-4"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            FlowPepe
          </h1>
          <h2
            className="text-yellow-400 text-2xl mb-6"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            Help Pepe Make It and Earn Points. WAGMI!
          </h2>
          <div
            className="text-blue-300 text-sm mb-8"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            A Telegram Game on Flow
          </div>
          <button
            onClick={handleStartClick}
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-lg flex items-center text-2xl"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            <span className="mr-3">START</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7v14"
              />
            </svg>
          </button>
        </div>
      )}
      <motion.main
        layout
        className="m-auto overflow-hidden flex flex-col max-w-[480px] border-8 border-zinc-200 rounded-xl bg-[#ded895] relative max-h-[800px] w-full h-full"
      >
        <Background />
        <motion.div
          ref={ref}
          key={_.last(rounds)?.key || "initial"}
          className="h-[calc(100%-7rem)] z-10 flex relative overflow-hidden cursor-pointer"
          onClick={showIntro ? undefined : handleWindowClick} // Prevent starting game from intro clicks
        >
          {isStarted && isReady && (
            <>
              <Pipes />
              <FlappyBird />
            </>
          )}
        </motion.div>
        <Footer isMuted={isMuted} toggleMute={toggleMute} />
      </motion.main>
    </div>
  );
}
