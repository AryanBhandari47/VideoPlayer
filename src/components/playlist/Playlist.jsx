"use client";

import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../Providers/PlayerContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SearchPlaylist from "./SearchPlaylist";
import Image from "next/image";

const Playlist = () => {
  const { playlist, setPlaylist, currentVideo, setCurrentVideo } =
    useContext(PlayerContext);
  const [filteredPlaylist, setFilteredPlaylist] = useState([]);

  useEffect(() => {
    setFilteredPlaylist(playlist);
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // setCurrentVideo(items[destination.index]);
    const reorderedList = [...playlist];
    const storeSourceIndex = source.index;
    const storeDestinatonIndex = destination.index;
    const [removedStore] = reorderedList.splice(storeSourceIndex, 1);
    reorderedList.splice(storeDestinatonIndex, 0, removedStore);
    setFilteredPlaylist(reorderedList);
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);

    // Set the user history
    const userHistory = JSON.parse(localStorage.getItem("userHistory")) || {};
    userHistory.currentVideo = video;
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
  };

  return (
    <>
      <SearchPlaylist setFilteredPlaylist={setFilteredPlaylist} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div
              className="flex flex-col w-full gap-2 my-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredPlaylist?.map((video, index) => (
                <Draggable
                  key={`${video?.title}`}
                  draggableId={`${video?.title}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleVideoClick(video)}
                      className={`bg-gray-200 relative group cursor-pointer  w-full p-4 rounded-lg hover:bg-rigi-purpleLight transition-all
                     duration-200 ease-in flex items-center justify-between ${
                       video?.thumb === currentVideo?.thumb &&
                       "bg-rigi-purpleLight"
                     }`}
                    >
                      <div className="flex flex-col w-2/3 gap-1 font-semibold">
                        <p>{video?.title}</p>
                        <p className="line-clamp-1 font-normal text-wrap text-sm">
                          {video.description}
                        </p>
                      </div>
                      <Image
                        src={video.thumb}
                        alt={video.title}
                        width={100}
                        height={100}
                      />
                      {/* <MdDragHandle className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 hidden group-hover:block" /> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Playlist;
