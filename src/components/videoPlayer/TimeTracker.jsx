import React from "react";

function TimeTracker({ totalDuration, elapsedSeconds }) {
  const elapsedMin = Math.floor(elapsedSeconds / 60);
  const elapsedSec = Math.floor(elapsedSeconds % 60);

  const totalMin = Math.floor(totalDuration / 60);
  const totalSec = Math.floor(totalDuration % 60);
  return (
    <div className="flex items-center gap-1  text-white text-xs tracking-tight">
      <span>
        {elapsedMin}:{elapsedSec.toString().padStart(2, "0")}
      </span>
      <span>/</span>
      <span>
        {totalMin}:{totalSec.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default TimeTracker;
