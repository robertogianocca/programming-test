"use client";

import { useRef } from "react";
import {
  MediaPlayer,
  MediaProvider,
  PlayButton,
  MuteButton,
  TimeSlider,
  FullscreenButton,
  VolumeSlider,
  Time,
  Controls,
  useMediaStore,
} from "@vidstack/react";

// Icons must be imported from the icons package
import {
  PlayIcon,
  PauseIcon,
  MuteIcon,
  VolumeLowIcon,
  VolumeHighIcon,
  FullscreenIcon,
  FullscreenExitIcon,
} from "@vidstack/react/icons";

export default function VidStackPlayerTest({ vimeoId }) {
  const player = useRef(null);

  const { paused, volume, muted, fullscreen, controlsHidden } = useMediaStore(player);

  const src = {
    src: `vimeo/${vimeoId ?? "1132948199"}`,
    type: "video/vimeo",
  };

  console.log("PAUSE" + paused);
  console.log("CONTROLS" + controlsHidden);

  return (
    <MediaPlayer ref={player} src={src} playsInline className="bg-red-400">
      <MediaProvider thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />

      <Controls.Root className="data-[visible]:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-30 transition-opacity pointer-events-none">
        <Controls.Group>
          <PlayButton className="vds-button vds-play-button bg-white rounded-full p-2 m-2">
            {paused ? <PlayIcon /> : <PauseIcon />}
          </PlayButton>
        </Controls.Group>
      </Controls.Root>
    </MediaPlayer>
  );
}
