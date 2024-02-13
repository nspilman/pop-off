// HLSAudioPlayer.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
import { sendTrackingEvent } from "../tracking";

const getTimestamp = (audio: HTMLAudioElement) => audio.currentTime;

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && audioRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(audioRef.current);
    } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = src;
    }
  }, [src]);

  return (
    <div>
      <UI src={src} audio={audioRef} />
      <audio
        ref={audioRef}
        controls
        style={{ display: "none" }}
        onClick={(e) =>
          sendTrackingEvent({
            type: "song_start",
            payload: {
              timestamp: getTimestamp(e.target as HTMLAudioElement),
              track: "peekneek",
            },
          })
        }
        onPlay={(e) =>
          sendTrackingEvent({
            type: "song_start",
            payload: {
              timestamp: getTimestamp(e.target as HTMLAudioElement),
              track: "peekneek",
            },
          })
        }
        onPause={(e) =>
          sendTrackingEvent({
            type: "song_pause",
            payload: {
              timestamp: getTimestamp(e.target as HTMLAudioElement),
              track: "peekneek",
            },
          })
        }
        onSeeked={(e) =>
          sendTrackingEvent({
            type: "song_update_time",
            payload: {
              timestamp: getTimestamp(e.target as HTMLAudioElement),
              track: "peekneek",
            },
          })
        }
      />
    </div>
  );
};

function UI({
  audio,
}: {
  src: string;
  audio: React.RefObject<HTMLMediaElement>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audioEl = audio.current;
    const updateProgress = () => {
      if (audioEl) {
        const { currentTime, duration } = audioEl;
        const progress = (currentTime / duration) * 100;
        setProgress(isNaN(progress) ? 0 : progress);
      }
    };

    const onEnded = (e: Event) => {
      setIsPlaying(false);
      sendTrackingEvent({
        type: "song_end",
        payload: {
          timestamp: getTimestamp(e.target as HTMLAudioElement),
          track: "peekneek",
        },
      });
    };

    if (audioEl) {
      audioEl.addEventListener("timeupdate", updateProgress);
      audioEl.addEventListener("ended", (e) => onEnded(e));
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener("timeupdate", updateProgress);
        audioEl.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [audio]);

  const togglePlayPause = () => {
    isPlaying ? audio.current?.pause() : audio.current?.play();
    setIsPlaying(!isPlaying);
  };

  const seekToPercentage = (percentage: number) => {
    const audioEl = audio.current;
    if (audioEl) {
      const duration = audioEl.duration;
      audioEl.currentTime = (percentage * duration) / 100;
      if (!isPlaying) {
        audioEl.play().then(() => setIsPlaying(true));
      }
    }
  };

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <div
      className="flex justify-between w-96 h-20 p-2 rounded-lg shadow-lg"
      style={{ backgroundColor: "rgb(26,40,74)" }}
    >
      <div className="flex flex-col content-center items-center justify-center flex-none h-full pr-2">
        <button
          onClick={togglePlayPause}
          className={`w-14 h-14 bg-gray-300 rounded-full shadow-inner flex items-center justify-center ${
            isPlaying ? "bg-[#83dada]" : ""
          }`}
          style={{ boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.25)" }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <div
        className="relative bg-white w-60 h-full p-1 rounded-lg border-2 border-gray-300 flex-grow"
        style={{ fontFamily: "Lucida Console, Monaco, monospace" }}
      >
        <div className="flex flex-col space-between">
          <div>
            <div className="flex justify-between items-center h-full">
              <div className="text-sm overflow-auto">
                FALLING (PREVIEW) / TONEWAY
              </div>
              <span className="text-xs">[MP3]</span>
            </div>
            <div className="text-sm overflow-auto">
              {formatTime(
                Math.round((progress * (audio.current?.duration || 0)) / 100)
              )}{" "}
              / {formatTime(Math.round(audio.current?.duration || 0))}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 cursor-pointer relative mt-2">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="flex justify-between w-full mt-2 absolute bottom-0">
              {Array.from({ length: 100 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => seekToPercentage(index)}
                  className="w-1 h-4 bg-gray-200 rounded-full cursor-pointer hover:bg-blue-500 opacity-0"
                  title={`Go to second ${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
