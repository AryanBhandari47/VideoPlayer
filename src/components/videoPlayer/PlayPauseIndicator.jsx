import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";

function PlayPauseIndicator({ isPlaying }) {
  return (
    <>
      {!isPlaying ? (
        <div className="rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black/70 p-4 flex items-center justify-center">
          <FaPlay className=" text-white w-4 h-4" />
        </div>
      ) : (
        <div className="rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black/70 p-4 flex items-center justify-center">
          <FaPause className=" text-white w-4 h-4" />
        </div>
      )}
    </>
  );
}

export default PlayPauseIndicator;
