"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { sendTrackingEvent } from "./tracking";

interface Props {
  src: string;
}

const getTimestamp = (audio: HTMLAudioElement) => audio.currentTime;

const HLSAudioPlayer = ({ src }: Props) => {
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
    <audio
      onClick={(e) =>
        sendTrackingEvent({
          type: "song_start",
          payload: { timestamp: getTimestamp(e.target as HTMLAudioElement) },
        })
      }
      onPlay={(e) =>
        sendTrackingEvent({
          type: "song_start",
          payload: { timestamp: getTimestamp(e.target as HTMLAudioElement) },
        })
      }
      onPause={(e) =>
        sendTrackingEvent({
          type: "song_pause",
          payload: { timestamp: getTimestamp(e.target as HTMLAudioElement) },
        })
      }
      onSeeked={(e) =>
        sendTrackingEvent({
          type: "song_update_time",
          payload: {
            timestamp: getTimestamp(e.target as HTMLAudioElement),
          },
        })
      }
      onEnded={(e) =>
        sendTrackingEvent({
          type: "song_end",
          payload: { timestamp: getTimestamp(e.target as HTMLAudioElement) },
        })
      }
      ref={audioRef}
      controls
    ></audio>
  );
};

export default HLSAudioPlayer;
