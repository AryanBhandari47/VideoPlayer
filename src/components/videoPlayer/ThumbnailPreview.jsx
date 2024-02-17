"use client";
import React, { useEffect, useState } from "react";

const generateThumbnail = (videoUrl, time) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = videoUrl;

    const onSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      }, "image/jpeg");

      video.removeEventListener("seeked", onSeeked);
      video.pause();
    };

    video.addEventListener("seeked", onSeeked);

    video.onloadeddata = () => {
      video.currentTime = time;
    };

    video.onerror = (error) => {
      reject(error);
    };

    video.load();
  });
};

function ThumbnailPreview({ time, videoUrl, clickedPosition }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  useEffect(() => {
    const fetchThumbnailData = async () => {
      const image = await generateThumbnail(videoUrl, time);
      setThumbnailUrl(image);
    };
    if (videoUrl) fetchThumbnailData();
  }, [videoUrl]);

  const leftDistance = Math.floor(clickedPosition * 100);

  return thumbnailUrl ? (
    <img
      className={`absolute bottom-10  transform -translate-x-1/2`}
      src={thumbnailUrl}
      style={{
        left:
          leftDistance < 15
            ? "15%"
            : leftDistance > 85
            ? "85%"
            : `${leftDistance}%`,
      }}
      alt="Thumbnail"
    />
  ) : null;
}

export default ThumbnailPreview;
