import "./globals.css";
import { Inter } from "next/font/google";
import PlayerContext from "@/Providers/PlayerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Video Player",
  description: "A Custom Video Player",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayerContext>{children}</PlayerContext>
      </body>
    </html>
  );
}
