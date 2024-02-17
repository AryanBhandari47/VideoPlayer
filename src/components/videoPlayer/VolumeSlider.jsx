import React from "react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

function VolumeSlider({
  isVolumeMute,
  handleVolumeToggle,
  volume,
  handleVolumeChange,
}) {
  return (
    <div className="flex items-center gap-1">
      {isVolumeMute ? (
        <MdVolumeOff
          onClick={handleVolumeToggle}
          className="w-5 h-5 text-white"
        />
      ) : (
        <MdVolumeUp
          onClick={handleVolumeToggle}
          className="w-5 h-5 text-white"
        />
      )}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className=" w-16 h-1 accent-rigi-purpleDark bg-white rounded-full cursor-pointer"
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default VolumeSlider;
