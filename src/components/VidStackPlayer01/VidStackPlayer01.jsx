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
        className="vds-controls-root data-[visible]:opacity-100 opacity-0 transition-opacity duration-300 absolute inset-0 flex flex-col justify-end z-30 pointer-events-none"
        hideOnMouseLeave={true}
        hideDelay={1000}
      >
        {/* Gradient backdrop to improve contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
        
        {/* Center Play/Pause Button Overlay - visible when paused */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <PlayButton
            className="vds-button vds-play-button pointer-events-auto"
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </PlayButton>
        </div>

        {/* Control Bar Container */}
        <div className="vds-controls-bar relative w-full pointer-events-auto">
          {/* Progress Bar - at the very bottom */}
          <div className="vds-progress-container relative w-full">
            <TimeSlider.Root className="vds-time-slider vds-slider group">
              <TimeSlider.Track className="vds-slider-track" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
              
              {/* Preview tooltip with timestamp - shows on hover/drag, updates as pointer moves */}
              <TimeSlider.Preview className="vds-slider-preview">
                <TimeSlider.Value />
              </TimeSlider.Preview>
              
              {/* Thumb - white and visible, follows cursor on hover/drag */}
              <TimeSlider.Thumb className="vds-slider-thumb" />
            </TimeSlider.Root>
          </div>

          {/* Controls Row - above progress bar */}
          <div className="vds-controls-row flex items-center justify-between px-3 pb-2 pt-2 gap-2">
            {/* LEFT: Play + Mute + Volume */}
            <Controls.Group className="flex items-center gap-1">
              <PlayButton
                className="vds-button vds-play-button"
                aria-label={paused ? "Play" : "Pause"}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </PlayButton>
              
              <div className="relative group flex items-center">
                <MuteButton
                  className="vds-button vds-mute-button"
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

                {/* Volume slider shows on hover */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 transition-all duration-200 overflow-hidden w-0 opacity-0 group-hover:w-24 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-2 rounded bg-black/80 backdrop-blur-sm">
                    <VolumeSlider.Root className="vds-volume-slider vds-slider">
                      <VolumeSlider.Track className="vds-slider-track" />
                      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                  </div>
                </div>
              </div>
            </Controls.Group>

            {/* CENTER: Time Display */}
            <Controls.Group className="flex items-center gap-1">
              <Time className="vds-time" type="current" />
              <span className="mx-0.5">/</span>
              <Time className="vds-time" type="duration" />
            </Controls.Group>

            {/* RIGHT: Fullscreen */}
            <Controls.Group>
              <FullscreenButton
                className="vds-button vds-fullscreen-button"
                aria-label="Toggle fullscreen"
              >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </FullscreenButton>
            </Controls.Group>
          </div>
        </div>
      </Controls.Root>
    </MediaPlayer>
  );
}
