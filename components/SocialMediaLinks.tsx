"use client";
import { FaSpotify, FaInstagram, FaApple } from "react-icons/fa";
export const SocialMediaLinks = () => {
  const instagram = "https://www.instagram.com/tonewaymusiic/";
  const spotify =
    "https://open.spotify.com/artist/1t55mAUl54AyulOFS6mjTn?si=lOdEmrf3RIa4C96pzkNLiQ";
  const appleMusic = "https://music.apple.com/us/artist/toneway/1694054168";

  return (
    <div className="flex">
      <a href={spotify} aria-label="Spotify" target={"_blank"}>
        <FaSpotify size={24} />
      </a>
      <a href={instagram} aria-label="Instagram" target={"_blank"}>
        <FaInstagram size={24} />
      </a>
      <a href={appleMusic} aria-label="Apple Music" target={"_blank"}>
        <FaApple size={24} />
      </a>
    </div>
  );
};
