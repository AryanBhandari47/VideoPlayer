import React from "react";
import dynamic from "next/dynamic";
import { FaPause, FaPlay } from "react-icons/fa";
import VolumeSlider from "./VolumeSlider";
import { MdFullscreen } from "react-icons/md";
import TimeTracker from "./TimeTracker";
const PlaybackRate = dynamic(() => import("./PlaybackRate"), {
  loading: () => <p>Loading...</p>,
});

function PlayerControls({
  isPlaying,
  handlePlayPauseClick,
  totalDuration,
  elapsedSeconds,
  isVolumeMute,
  handleVolumeToggle,
  volume,
  handleVolumeChange,
  playbackRate,
  setPlaybackRate,
  handleFullscreen,
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4 items-center">
        <button
          onClick={handlePlayPauseClick}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {!isPlaying ? (
            <FaPlay className="text-white w-3 h-3" />
          ) : (
            <FaPause className="text-white w-3 h-3" />
          )}
        </button>
        <TimeTracker
          totalDuration={totalDuration}
          elapsedSeconds={elapsedSeconds}
        />
      </div>

      <div className="flex items-center gap-2">
        <VolumeSlider
          isVolumeMute={isVolumeMute}
          handleVolumeToggle={handleVolumeToggle}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
        <PlaybackRate
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
        />
        <div onClick={handleFullscreen} accessKey="f">
          <MdFullscreen className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
