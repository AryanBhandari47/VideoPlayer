"use client";

import { PlayerContext } from "@/Providers/PlayerContext";
import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function SearchPlaylist({ setFilteredPlaylist }) {
  const { playlist, setPlaylist } = useContext(PlayerContext);
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (e) => {
    e.preventDefault();
    const inputText = e.target.value.trim();
    setSearchText(inputText);
    if (inputText.length > 0) {
      const newPlaylist = playlist.filter((video) =>
        video.title.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteredPlaylist(newPlaylist);
    } else {
      setFilteredPlaylist(playlist);
    }
  };
  return (
    <div
      className="flex justify-between items-center w-full mt-6 bg-gray-200
      rounded-full py-2 px-2 zingMargin"
    >
      <IoSearchOutline className="w-6 h-6 ml-2" />
      <input
        type="text"
        placeholder="Search for the video"
        className="w-full bg-transparent focus:outline-none ml-2"
        onChange={(e) => handleSearchInput(e)}
      />
    </div>
  );
}

export default SearchPlaylist;
