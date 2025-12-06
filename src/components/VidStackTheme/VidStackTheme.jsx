"use client";

import { useRef } from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";

// Default layout import (example from docs)
import { DefaultVideoLayout, defaultLayoutIcons } from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

/**
 * DefaultLayoutPlayer - uses VidStack's pre-built DefaultVideoLayout
 * Pros: quick to ship, accessible, responsive, feature-rich
 * Cons: less pixel-level control unless you override slots/variables
 */
export default function DefaultLayoutPlayer({ vimeoId }) {
  const playerRef = useRef(null);

  const src = `vimeo/${vimeoId ?? "1132948199"}`;

  const thumbnail = "https://files.vidstack.io/sprite-fight/thumbnail.jpg"; // optional poster

  return (
    <MediaPlayer title="..." src={src} playsInline>
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}
