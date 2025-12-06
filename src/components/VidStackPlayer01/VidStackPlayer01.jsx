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

/**
 * OptimizedVidStackPlayer
 * - Uses useMediaStore (single subscription) rather than multiple useMediaState calls
 * - Removes React state for volume hover; uses Tailwind `group`/`group-hover`
 * - Uses Controls.Root / Controls.Group to structure controls
 * - Cleaner className layout and pointer-events handling
 */
export default function VidStackPlayer01({ vimeoId }) {
  const player = useRef(null);
  // Single store subscription for multiple properties (fewer renders).
  // Because hooks run outside the MediaPlayer's rendered children, we pass the ref.
  const { paused, volume, muted, fullscreen, controlsHidden } = useMediaStore(player);

  const src = {
    src: `vimeo/${vimeoId ?? "1132948199"}`,
    type: "video/vimeo",
  };

  console.log("PAUSE" + paused);
  console.log("CONTROLS" + controlsHidden);

  return (
    <MediaPlayer
      ref={player}
      playsInline
      src={src}
      autoPlay={false}
      className="relative w-full aspect-video bg-black"
    >
      <MediaProvider thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />

      {/* Controls container (full bottom overlay). Controls.Root gives semantic grouping attributes. */}
      <Controls.Root
        className="data-[visible]:opacity-100 opacity-0 transition-opacity absolute inset-0 flex flex-col justify-end z-30 pointer-events-none"
        hideOnMouseLeave={true}
        hideDelay={1000}
      >
        {/* gradient backdrop to improve contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        {/* Center play overlay — visible when paused */}
        {/* Center Play/Pause Button Overlay */}
        <div
          // We keep it mounted always; toggle visibility with CSS so the PlayButton is present to receive clicks.
          className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-150
   `}
        >
          <PlayButton
            className="vds-button vds-play-button pointer-events-auto rounded-full p-3 shadow-md"
            aria-label={paused ? "Play" : "Pause"}
          >
            {/* MUST provide both icons (Play vs Pause). PlayButton will only toggle playback,
        it's up to you to render the correct child icon. */}
            {paused ? <PlayIcon /> : <PauseIcon />}
          </PlayButton>
        </div>

        <div className="relative px-4 pb-4 pt-2 pointer-events-auto">
          {/* Controls row */}
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: Mute + Volume (use group hover; no React state) */}
            <Controls.Group className="flex items-center gap-2">
              <div className="relative group flex items-center gap-2">
                <MuteButton
                  className="vds-button vds-mute-button text-white"
                  aria-label="Toggle mute"
                >
                  {muted || volume === 0 ? (
                    <MuteIcon />
                  ) : volume < 0.5 ? (
                    <VolumeLowIcon />
                  ) : (
                    <VolumeHighIcon />
                  )}
                </MuteButton>

                {/* Volume slider shows on hover (group-hover) */}
                <div
                  className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 transition-all duration-150 overflow-hidden
                    w-0 opacity-0 group-hover:w-28 group-hover:opacity-100`}
                  style={{ willChange: "width, opacity" }}
                >
                  <div className="p-2 rounded bg-black/60 backdrop-blur-sm">
                    <VolumeSlider.Root className="vds-volume-slider vds-slider">
                      <VolumeSlider.Track className="vds-slider-track" />
                      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                  </div>
                </div>
              </div>
            </Controls.Group>

            {/* CENTER: current / duration */}
            <Controls.Group className="flex items-center gap-2 text-white text-sm">
              <Time className="vds-time" type="current" />
              <span>/</span>
              <Time className="vds-time" type="duration" />
            </Controls.Group>

            {/* RIGHT: fullscreen */}
            <Controls.Group>
              <FullscreenButton
                className="vds-button vds-fullscreen-button text-white"
                aria-label="Toggle fullscreen"
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </FullscreenButton>
            </Controls.Group>
          </div>

          {/* Time slider (top of controls row) */}
          <div className="">
            <TimeSlider.Root className="vds-time-slider vds-slider">
              <TimeSlider.Track className="vds-slider-track" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
              <TimeSlider.Thumb className="vds-slider-thumb" />
            </TimeSlider.Root>
          </div>
        </div>
      </Controls.Root>
    </MediaPlayer>
  );
}
