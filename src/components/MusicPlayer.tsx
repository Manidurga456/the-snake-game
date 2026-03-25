import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '../types';
import { DUMMY_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-cyan-500/30">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex gap-1 items-end h-8">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i} 
                    className="w-1 bg-cyan-400 animate-pulse" 
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.5s'
                    }} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate">{currentTrack.title}</h3>
          <p className="text-cyan-400/80 text-sm truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-magenta-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={skipBackward}
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
            >
              <SkipBack size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,255,255,0.6)] active:scale-95"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
              onClick={skipForward}
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
            >
              <SkipForward size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Volume2 size={18} className="hover:text-cyan-400 transition-colors cursor-pointer" />
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="mt-8 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Playlist</p>
        {DUMMY_TRACKS.map((track, index) => (
          <button
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
              currentTrackIndex === index ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-xs font-mono opacity-50">0{index + 1}</span>
              <span className="text-sm truncate">{track.title}</span>
            </div>
            {currentTrackIndex === index && isPlaying && (
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-0.5 bg-cyan-400 animate-[bounce_0.6s_infinite]" />
                <div className="w-0.5 bg-cyan-400 animate-[bounce_0.8s_infinite]" />
                <div className="w-0.5 bg-cyan-400 animate-[bounce_0.5s_infinite]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
