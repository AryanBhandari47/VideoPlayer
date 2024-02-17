import React from "react";

function VideoElement({ currentVideo, autoPlay, muted, onClick, videoRef }) {
  return (
    <video
      poster={currentVideo?.thumb}
      autoPlay={autoPlay}
      muted={muted}
      src={currentVideo?.sources[0]}
      onClick={onClick}
      ref={videoRef}
      className="object-center h-full w-full object-cover rounded-lg"
      aria-label="Video Player"
    />
  );
}

export default VideoElement;
