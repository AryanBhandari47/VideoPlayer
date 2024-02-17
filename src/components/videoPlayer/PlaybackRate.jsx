"use client";
import { PLAYBACK_RATES } from "@/utils/constants";
import React, { useEffect, useRef, useState } from "react";
import { RiSpeedUpFill } from "react-icons/ri";

const PlaybackSpeedModal = ({
  playbackRate,
  setPlaybackRate,
  showModal,
  close,
}) => {
  const handlePlayblackRate = (rate) => {
    if (rate < 0) return;
    setPlaybackRate(rate);
  };
  return (
    showModal && (
      <>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="absolute z-30 overflow-clip right-0 bottom-10 bg-rigi-purpleDark rounded-lg w-32 sm:w-60"
        >
          <h2 id="modal-title" className="sr-only">
            Playback Speed Options
          </h2>
          <ul>
            {PLAYBACK_RATES.map((rate, i) => {
              return (
                <div
                  key={rate}
                  className={`p-1 sm:p-2 w-full flex justify-center hover:bg-rigi-purpleLight `}
                  onClick={() => handlePlayblackRate(rate)}
                >
                  <p className="text-xs text-white">{rate}x</p>
                </div>
              );
            })}
          </ul>
        </div>
        <div
          aria-label="Close"
          onClick={close}
          className="top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed "
        ></div>
      </>
    )
  );
};

function PlaybackRate({ playbackRate, setPlaybackRate }) {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <div
      className="flex items-center gap-[2px] relative"
      aria-expanded={open}
      role="button"
      aria-label="Toggle playback speed options"
      onClick={toggleModal}
    >
      <RiSpeedUpFill className="h-4 w-4 text-white" />
      <p className="text-white text-xs">{playbackRate}x</p>

      <PlaybackSpeedModal
        playbackRate={playbackRate}
        setPlaybackRate={setPlaybackRate}
        showModal={open}
        close={toggleModal}
      />
    </div>
  );
}

export default PlaybackRate;
