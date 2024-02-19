import Playlist from "@/components/playlist/Playlist";
import Player from "@/components/videoPlayer/Player";

export default function Home() {
  return (
    <div className="bg-black/95 w-full min-h-screen">
      <main className="flex flex-col h-full px-4  items-center justify-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
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
