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

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <audio ref={audioRef} src="/jeet.m4a" />
      <motion.main
        layout
        className="m-auto overflow-hidden flex flex-col max-w-[480px] border-8 border-zinc-200 rounded-xl bg-[#ded895] relative max-h-[800px] w-full h-full"
        onClick={handleWindowClick}
      >
        <Background />
        <motion.div
          ref={ref}
          key={_.last(rounds)?.key || "initial"}
          className="h-[calc(100%-7rem)] z-10 flex relative overflow-hidden cursor-pointer"
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
