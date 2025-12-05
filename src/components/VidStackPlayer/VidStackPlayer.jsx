"use client";
import { useRef, useState, useEffect } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlayButton } from "@vidstack/react";
import { PlayIcon, PauseIcon } from "@vidstack/react/icons";
import { useMediaState } from "@vidstack/react";
import { MuteButton } from "@vidstack/react";
import { MuteIcon, VolumeHighIcon, VolumeLowIcon } from "@vidstack/react/icons";
import { TimeSlider } from "@vidstack/react";
import { FullscreenButton } from "@vidstack/react";
import { VolumeSlider } from "@vidstack/react";
import { FullscreenExitIcon, FullscreenIcon } from "@vidstack/react/icons";
import { Time } from "@vidstack/react";

export default function VidStackPlayer({ vimeoId }) {
  const player = useRef(null);
  const paused = useMediaState("paused", player);
  const volume = useMediaState("volume", player);
  const isMuted = useMediaState("muted", player);
  const isFullscreen = useMediaState("fullscreen", player);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeoutRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const playerContainerRef = useRef(null);

  // Auto-hide controls when playing
  useEffect(() => {
    if (paused) {
      // Always show controls when paused
      setShowControls(true);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
        hideControlsTimeoutRef.current = null;
      }
    } else {
      // Hide controls after 2 seconds when playing
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }

    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [paused]);

  // Show controls on mouse movement
  const handleMouseMove = (e) => {
    setShowControls(true);
    
    // Track mouse position for custom cursor (desktop only)
    // Get the actual DOM element - in fullscreen, use the fullscreen element, otherwise use container
    let targetElement = playerContainerRef.current;
    
    if (isFullscreen) {
      // In fullscreen, get the actual fullscreen DOM element
      const fullscreenEl = document.fullscreenElement;
      if (fullscreenEl && fullscreenEl instanceof HTMLElement) {
        targetElement = fullscreenEl;
      }
    }
    
    if (targetElement && typeof targetElement.getBoundingClientRect === "function") {
      const rect = targetElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      // Check if mouse is over controls area (bottom portion)
      const isOverControls = y > rect.height * 0.7;
      const isOverControlElement = e.target.closest(".vds-button") || 
                                    e.target.closest(".vds-slider") ||
                                    e.target.closest(".vds-time");
      
      // Show custom cursor only on desktop, when not over controls
      setShowCustomCursor(!isOverControls && !isOverControlElement);
    }
    
    if (!paused) {
      // Reset the hide timer
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  // Show controls on mouse leave (keep them visible briefly)
  const handleMouseLeave = () => {
    setShowCustomCursor(false);
    if (!paused) {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  // Handle click on video container to play/pause
  const handleVideoClick = (e) => {
    // Don't toggle if clicking on controls (buttons, sliders, etc.)
    const target = e.target;
    const isControlElement =
      target.closest(".vds-button") ||
      target.closest(".vds-slider") ||
      target.closest(".vds-time") ||
      target.closest(".vds-volume-slider") ||
      target.closest(".vds-time-slider") ||
      target.closest(".vds-play-button");

    if (!isControlElement && player.current) {
      if (paused) {
        player.current.play();
      } else {
        player.current.pause();
      }
    }
  };

  return (
    <div 
      ref={playerContainerRef} 
      className="relative w-full aspect-video"
      style={{
        cursor: showCustomCursor ? "none" : "default",
      }}
    >
      <MediaPlayer
        ref={player}
        playsInline
        src={{
          src: `vimeo/${vimeoId || "1132948199"}`,
          type: "video/vimeo",
        }}
        autoPlay={false}
        className="relative w-full h-full bg-black"
        style={{
          cursor: showCustomCursor ? "none" : !paused && !showControls ? "none" : "default",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleVideoClick}
      >
      <MediaProvider thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" />

      {/* Custom Cursor - Desktop Only */}
      {showCustomCursor && (
        <div
          className="hidden sm:block absolute pointer-events-none z-[9999]"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-white/90 rounded-full p-2 shadow-lg">
            {paused ? (
              <PlayIcon className="w-6 h-6 text-black" />
            ) : (
              <PauseIcon className="w-6 h-6 text-black" />
            )}
          </div>
        </div>
      )}

      {/* Center Play/Pause Button Overlay - Mobile Only */}
      {paused ? (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none sm:hidden">
          <PlayButton className="vds-button vds-play-button pointer-events-auto">
            <PlayIcon />
          </PlayButton>
        </div>
      ) : (
        showControls && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none sm:hidden">
            <PlayButton className="vds-button vds-play-button pointer-events-auto">
              <PauseIcon />
            </PlayButton>
          </div>
        )
      )}

      {/* Bottom Controls Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end z-30 pointer-events-none transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Gradient overlay for better control visibility */}
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Controls Container */}
        <div className="relative px-4 pb-4 pt-2 pointer-events-auto">
          {/* Progress Bar - Bottom */}
          <div className="mb-3">
            <TimeSlider.Root className="vds-time-slider vds-slider group">
              <TimeSlider.Track className="vds-slider-track" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
              <TimeSlider.Thumb className="vds-slider-thumb" />
            </TimeSlider.Root>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Volume Control */}
            <div
              className="flex items-center gap-2"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <MuteButton className="vds-button vds-mute-button text-white">
                {isMuted || volume === 0 ? (
                  <MuteIcon />
                ) : volume < 0.5 ? (
                  <VolumeLowIcon />
                ) : (
                  <VolumeHighIcon />
                )}
              </MuteButton>

              {/* Volume Slider - Shows on hover, hidden on mobile */}
              <div
                className={`hidden sm:block transition-all duration-200 overflow-hidden ${
                  showVolumeSlider ? "w-24 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <VolumeSlider.Root className="vds-volume-slider vds-slider">
                  <VolumeSlider.Track className="vds-slider-track" />
                  <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                  <VolumeSlider.Thumb className="vds-slider-thumb" />
                </VolumeSlider.Root>
              </div>
            </div>

            {/* Center: Time Display */}
            <div className="flex items-center gap-2 text-white text-sm">
              <Time className="vds-time" type="current" />
              <span>/</span>
              <Time className="vds-time" type="duration" />
            </div>

            {/* Right: Fullscreen Button */}
            <FullscreenButton className="vds-button vds-fullscreen-button text-white">
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullscreenButton>
          </div>
        </div>
      </div>
    </MediaPlayer>
    </div>
  );
}
