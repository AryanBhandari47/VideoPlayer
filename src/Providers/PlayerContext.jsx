"use client";

import { VIDEO_DATA } from "@/utils/constants";
import React, { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();

export default function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState(VIDEO_DATA);
  const [currentVideo, setCurrentVideo] = useState(playlist[0]);

  // To set where users left off
  useEffect(() => {
    if (localStorage && localStorage.getItem("userHistory")) {
      const userHistory = JSON.parse(localStorage.getItem("userHistory"));
      if (userHistory.currentVideo) {
        setCurrentVideo(userHistory.currentVideo);
      }
    }
  }, []);
  return (
    <PlayerContext.Provider
      value={{ playlist, setPlaylist, currentVideo, setCurrentVideo }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
