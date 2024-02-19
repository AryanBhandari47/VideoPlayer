"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { PlayerContext } from "../../Providers/PlayerContext";
import PlayPauseIndicator from "./PlayPauseIndicator";
import Spinner from "../global/Spinner";
const ThumbnailPreview = dynamic(() => import("./ThumbnailPreview"), {
  loading: () => <p>Loading...</p>,
});
import VideoElement from "./VideoElement";
const PlayerControls = dynamic(() => import("./PlayerControls"), {
  loading: () => <p>Loading...</p>,
});

const Player = ({ src, muted = false, autoPlay = true }) => {
  const { currentVideo, playlist, setCurrentVideo } = useContext(PlayerContext);
  const [volume, setVolume] = useState(1);
  const [isVolumeMute, setIsVolumeMute] = useState(false);
  const [showPlayPauseIndicator, setShowPlayPauseIndicator] = useState(false);
  const [isHovering, setIsHovering] = useState(0);
  const [hoveringTime, setHoveringTime] = useState(0);

  const [isWaiting, setIsWaiting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [clickedPosition, setClickedPosition] = useState(null);

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const bufferRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    handlePlayPauseIndicator();
  }, []);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const onWaiting = () => {
      if (isPlaying) setIsPlaying(false);
      setIsWaiting(true);
    };

    const onPlay = () => {
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
      setIsWaiting(false);
    };

    const element = videoRef.current;

    const onProgress = () => {
      if (!element.buffered || !bufferRef.current) return;
      if (!element.buffered.length) return;
      const bufferedEnd = element.buffered.end(element.buffered.length - 1);
      const duration = element.duration;
      if (bufferRef && duration > 0) {
        bufferRef.current.style.width = (bufferedEnd / duration) * 100 + "%";
      }
    };

    const onTimeUpdate = () => {
      setIsWaiting(false);
      if (!element.buffered || !progressRef.current) return;
      const duration = element.duration;
      setTotalDuration(duration);
      setElapsedSeconds(element.currentTime);

      if (progressRef && duration > 0) {
        progressRef.current.style.width =
          (element.currentTime / duration) * 100 + "%";
      }
    };

    // For keyboard warriors
    const handlekeydown = (e) => {
      if (e.key === " ") {
        if (e.target.tagName.toLowerCase() === "input") return;
        e.preventDefault();
        handlePlayPauseIndicator();
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        console.log();
        seekToPosition(
          Math.min(1, (element.currentTime + 5) / element.duration)
        );
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekToPosition(
          Math.max(0, (element.currentTime - 5) / element.duration)
        );
      }
    };
    // To save where user left off
    const handleBeforeUnload = () => {
      if (element) {
        const userHistory =
          JSON.parse(localStorage.getItem("userHistory")) || {};
        userHistory.totalDuration = element.duration;
        userHistory.elapsedSeconds = element.currentTime;
        localStorage.setItem("userHistory", JSON.stringify(userHistory));
      }
    };

    element.addEventListener("progress", onProgress);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("waiting", onWaiting);
    element.addEventListener("play", onPlay);
    element.addEventListener("playing", onPlay);
    element.addEventListener("pause", onPause);

    document.body.addEventListener("keydown", handlekeydown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // clean up
    return () => {
      element.removeEventListener("waiting", onWaiting);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("playing", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("progress", onProgress);
      element.removeEventListener("timeupdate", onTimeUpdate);

      document.body.removeEventListener("keydown", handlekeydown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [videoRef.current]);

  // This is where the playback rate is set on the video element.
  useEffect(() => {
    if (!videoRef.current) return;
    if (videoRef.current.playbackRate === playbackRate) return;
    videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  // To set where users left off
  useEffect(() => {
    if (localStorage.getItem("userHistory") && videoRef.current) {
      const userHistory = JSON.parse(localStorage.getItem("userHistory"));
      if (userHistory?.elapsedSeconds) {
        videoRef.current.currentTime = userHistory?.elapsedSeconds;
        setTotalDuration(userHistory.totalDuration);
        setElapsedSeconds(userHistory.elapsedSeconds);
      }
    }
  }, [videoRef.current]);

  let indicatorTimeout;
  const handlePlayPauseIndicator = () => {
    setShowPlayPauseIndicator(true);
    clearTimeout(indicatorTimeout);
    indicatorTimeout = setTimeout(() => {
      setShowPlayPauseIndicator(false);
    }, 3000);
  };

  const handlePlayPauseClick = () => {
    handlePlayPauseIndicator();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const seekToPosition = (pos) => {
    if (!videoRef.current) return;
    if (pos < 0 || pos > 1) return;

    const durationMs = videoRef.current.duration * 1000 || 0;

    const newElapsedMs = durationMs * pos;
    const newTimeSec = newElapsedMs / 1000;
    videoRef.current.currentTime = newTimeSec;
  };

  const handleFullscreen = () => {
    const element = videoContainerRef.current;
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) setIsVolumeMute(true);
    else setIsVolumeMute(false);
  };

  const handleVolumeToggle = () => {
    if (isVolumeMute) {
      videoRef.current.volume = 1;
      setVolume(1);
    } else {
      videoRef.current.volume = 0;
      setVolume(0);
    }
    setIsVolumeMute(!isVolumeMute);
  };

  const handleMouseMoveOnTimeline = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickedPos = (e.clientX - left) / width;
    setClickedPosition(clickedPos);
    const durationMs = videoRef.current.duration * 1000 || 0;

    const newElapsedMs = durationMs * clickedPos;
    const newTimeSec = newElapsedMs / 1000;
    setHoveringTime(newTimeSec);
    setIsHovering(true);
  };

  console.log(clickedPosition);

  return (
    <div
      ref={videoContainerRef}
      className=" group w-full h-[200px] sm:h-[400px] flex flex-col relative overflow-hidden justify-center items-center cursor-pointer"
    >
      {isWaiting && <Spinner />}
      <VideoElement
        currentVideo={currentVideo}
        autoPlay={autoPlay}
        muted={muted}
        onClick={handlePlayPauseClick}
        videoRef={videoRef}
      />

      {showPlayPauseIndicator && <PlayPauseIndicator isPlaying={isPlaying} />}

      {/* TIMELINE  */}
      <div className="w-full h-100px rounded-b-lg bg-gradient-to-b from-transparent to-black/50 absolute opacity-0 group-hover:opacity-100 duration-500 transition-all bottom-0 left-0 flex items-end px-4 pb-2">
        <div className="w-full flex flex-col items-center">
          {isHovering > 0 && (
            <ThumbnailPreview
              time={hoveringTime}
              videoUrl={currentVideo?.sources[0]}
              clickedPosition={clickedPosition}
            />
          )}

          <div
            // onMouseEnter={}
            onMouseMove={(e) => handleMouseMoveOnTimeline(e)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const clickedPos = (e.clientX - left) / width;
              setIsWaiting(true);
              seekToPosition(clickedPos);
            }}
            className="w-full transition-all duration-100 ease-linear h-2 mb-2 rounded-lg bg-gray-100 overflow-hidden"
            role="slider"
            aria-label="Video Progress"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-valuenow={elapsedSeconds}
          >
            <div className="relative w-full h-full">
              <span
                className="bg-rigi-purpleDark absolute z-20 h-full"
                ref={progressRef}
              ></span>
              <span
                className="bg-rigi-purpleLight absolute h-full z-10"
                ref={bufferRef}
              ></span>
            </div>
          </div>
          {/* Controls */}
          <PlayerControls
            isPlaying={isPlaying}
            handlePlayPauseClick={handlePlayPauseClick}
            totalDuration={totalDuration}
            elapsedSeconds={elapsedSeconds}
            isVolumeMute={isVolumeMute}
            handleVolumeToggle={handleVolumeToggle}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
            handleFullscreen={handleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
