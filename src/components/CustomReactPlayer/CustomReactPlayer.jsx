'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function CustomReactPlayer({ url }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);
  const playerWrapperRef = useRef(null);

  // Handle play/pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setPlayed(pos);
    setPlayedSeconds(pos * duration);
  
    if (playerRef.current) {
      // Use seekTo for most players
      if (typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(pos);
      } else if (playerRef.current.getInternalPlayer) {
        // For Vimeo
        playerRef.current.getInternalPlayer().then((p) => p.setCurrentTime(pos * duration));
      }
    }
  };
  

  // Handle progress bar drag
  const handleProgressMouseDown = () => {
    setSeeking(true);
  };

  const handleProgressMouseUp = (e) => {
    setSeeking(false);
    handleProgressClick(e);
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (playerWrapperRef.current) {
      if (!document.fullscreenElement) {
        playerWrapperRef.current.requestFullscreen().catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={playerWrapperRef} className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <ReactPlayer
          ref={playerRef}
          src={url}
          playing={playing}
          volume={volume}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          onProgress={(state) => {
            if (!seeking) {
              setPlayed(state.played);
              setPlayedSeconds(state.playedSeconds);
            }
          }}
          onDuration={(duration) => setDuration(duration)}
          config={{
            vimeo: {
              playerOptions: {
                controls: false, // Hide Vimeo controls
              },
            },
          }}
        />
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div
          className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4"
          onClick={handleProgressClick}
          onMouseDown={handleProgressMouseDown}
          onMouseUp={handleProgressMouseUp}
        >
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${played * 100}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Side: Play/Pause and Time */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Time Stamps */}
            <div className="text-white text-sm">
              {formatTime(playedSeconds)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Side: Volume and Fullscreen */}
          <div className="flex items-center gap-4">
            {/* Volume Icon and Bar */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {volume === 0 ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                ) : volume < 0.5 ? (
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                )}
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Fullscreen"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

