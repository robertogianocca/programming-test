"use client";

import { useRef } from "react";
import { FullscreenButton, MediaPlayer, MediaProvider, Poster } from "@vidstack/react";

// Default layout import (example from docs)
import { PlyrLayout, plyrLayoutIcons } from "@vidstack/react/player/layouts/plyr";

/**
 * DefaultLayoutPlayer - uses VidStack's pre-built DefaultVideoLayout
 * Pros: quick to ship, accessible, responsive, feature-rich
 * Cons: less pixel-level control unless you override slots/variables
 */
export default function VidStackPlyr({ vimeoId }) {
  const playerRef = useRef(null);

  const src = {
    src: `vimeo/${vimeoId ?? "1132948199"}`,
  };

  const thumbnail = "https://files.vidstack.io/sprite-fight/thumbnail.jpg"; // optional poster

  return (
    <MediaPlayer title="Sprite Fight" src={src} controls={false} crossOrigin type={"video/vimeo"}>
      <MediaProvider />
      <PlyrLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={plyrLayoutIcons}
        // controls={[
        //   "playButton",
        //   "timeSlider",
        //   "fullscreenButton",
        //   "volumeSlider",
        //   "settingsButton",
        //   "pipButton",
        // ]}
        slots={{
          settingsButton: null, // or some custom component — but null should remove it
          smallLayout: {},
        }}
      />
    </MediaPlayer>
  );
}
