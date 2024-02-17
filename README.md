# [Rigi - Assignment](https://rigi-assignment-opal.vercel.app/)

Custom video player using Next.js and Tailwindcss.
[Visit Hosted Version][vercel]

[vercel]: https://rigi-assignment-opal.vercel.app/ "Vercel"

## Installation

npm install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Lighthouse Score

![Screenshot 1](/public/assets/screenshots/lighthouseScore.png)

## Features included

### Video Element (Fully Custom Made)

1. Play/Pause toggle.
2. Seek functionality.
3. Timer displaying current playback time and duration.
4. Autoplay.
5. Speed selector for playback speed adjustment.
6. Added features such as fullscreen mode, volume control, thumbnail previews (on holding mouse over timeline)

### Playlist ([Library Used](https://www.npmjs.com/package/react-beautiful-dnd))

1.  A playlist component to display and manage videos.
2.  Allows users to reorder videos in the playlist.
3.  Clicking on a video in the playlist loads and play that video in the video player.
4.  Search functionality for the playlist.

### Extras

1. Made the application responsive for various screen sizes.
2. Added keyboard shortcuts for keyboard warriors. (arrow left, arrow right and spacebar)
3. Videos continue playing from where users left-off.
