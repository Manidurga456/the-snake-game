import { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Trophy, Music, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-magenta-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Gamepad2 className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic">
                Neon<span className="text-cyan-400">Snake</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Arcade Edition</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-4">
                <Trophy size={32} className="text-magenta-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]" />
                <div className="flex gap-1.5">
                  {score.toString().padStart(5, '0').split('').map((digit, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-14 bg-magenta-500/10 border-2 border-magenta-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.4)] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-magenta-500/5 group-hover:bg-magenta-500/20 transition-colors" />
                      <span className="text-3xl font-digital font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] relative z-10">
                        {digit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mt-2 mr-1">Current Score</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Stats */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                Game Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Difficulty</span>
                  <span className="text-sm font-mono text-white">HARDCORE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Multiplier</span>
                  <span className="text-sm font-mono text-magenta-400">x1.5</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Top Score</span>
                  <span className="text-sm font-mono text-white">02450</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h2 className="text-xs font-bold text-magenta-400 uppercase tracking-widest mb-4">Instructions</h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-mono">01</span>
                  Use arrow keys to navigate the neon grid.
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-mono">02</span>
                  Collect magenta orbs to grow and score.
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-mono">03</span>
                  Avoid the walls and your own tail.
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Center Column: Game */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SnakeGame onScoreChange={setScore} />
            </motion.div>
          </div>

          {/* Right Column: Music Player */}
          <div className="lg:col-span-3 flex justify-center order-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <div className="mb-4 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <Music size={14} />
                Now Playing
              </div>
              <MusicPlayer />
            </motion.div>
          </div>

        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 py-12 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          <div className="flex gap-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Vaporwave</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Cyberpunk</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Synthwave</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold">© 2026 Neon Arcade Systems</p>
        </div>
      </footer>
    </div>
  );
}
