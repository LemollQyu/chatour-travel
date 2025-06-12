"use client";
import { useState, useRef } from "react";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="w-full h-full  relative">
      <video
        src="/video/makkah.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      {/* Kontrol audio */}
      <div className="absolute bottom-2 left-2 flex items-center  gap-2 bg-dark/80 bg-opacity-70 p-2 rounded-xl shadow">
        <button onClick={toggleAudio} className="text-xl">
          {isPlaying ? "🎵" : "🔇"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 custom-slider"
          style={{
            background: `linear-gradient(to right, #edbe9f 0%, #edbe9f ${
              volume * 100
            }%, #ffffff ${volume * 100}%, #ffffff 100%)`,
          }}
        />
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/music/labaikallah.mp3" loop />
    </div>
  );
};

export default Banner;
