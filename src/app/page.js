import Playlist from "@/components/playlist/Playlist";
import Player from "@/components/videoPlayer/Player";
import { LOGO_URL } from "@/utils/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black/95 w-full h-full">
      <main className="flex flex-col h-full px-4  items-center justify-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src={LOGO_URL} width={90} height={90} alt="Rigi Logo" />
          <h1 className="font-semibold text-3xl my-6 text-rigi-purpleDark">
            Video Player
          </h1>
        </div>
        <Player />
        <Playlist />
      </main>
    </div>
  );
}
