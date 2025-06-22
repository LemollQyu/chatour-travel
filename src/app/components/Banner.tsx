"use client";
import { useState, useRef } from "react";

const Banner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play(); // tunggu sampai berhasil play
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback error:", error);
    }
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
      <div className="absolute lg:block hidden inset-0  bg-[#edbe9f]/50 mix-blend-multiply pointer-events-none z-10" />
      <div className="hidden absolute left-10 bottom-10 w-56 lg:flex flex-col gap-3">
        <h1 className="font-stopsn text-5xl md:block hidden text-extralight text-accentt tracking-widest">
          Chatour <br /> Travel
        </h1>
        <p className="font-custom md:block hidden text-[1.5rem] text-base">
          Temukan perjalanan ibadah yang amanah dan nyaman bersama Chatour
        </p>
      </div>
      <video
        src="/video/makkah.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      {/* Kontrol audio desktop */}
      <div className="absolute lg:flex  top-2 left-2 hidden items-center   gap-2 bg-dark/80 bg-opacity-70 p-2 rounded-xl shadow">
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
          className="w-24 custom-slider sm:hidden block"
          style={{
            background: `linear-gradient(to right, #edbe9f 0%, #edbe9f ${
              volume * 100
            }%, #ffffff ${volume * 100}%, #ffffff 100%)`,
          }}
        />
      </div>

      {/* Kontrol audio laptop kebawan */}
      <div className="absolute flex  right-2 bottom-2 lg:hidden items-center   gap-2 bg-dark/80 bg-opacity-70 p-2 rounded-xl shadow">
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
          className="w-24 custom-slider sm:hidden block"
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
