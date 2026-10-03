import { useState } from 'react';
import { Play, BookOpen, BarChart2, Settings, X, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { PlayerStats } from '../types';
import { sound } from '../game/audio';

interface StartScreenProps {
  stats: PlayerStats;
  onStartCooking: () => void;
  onResetStats: () => void;
}

export function StartScreen({ stats, onStartCooking, onResetStats }: StartScreenProps) {
  const [activeModal, setActiveModal] = useState<'howToPlay' | 'leaderboard' | 'settings' | null>(null);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playAdd();
    }
  };

  const handleStart = () => {
    sound.playServe();
    onStartCooking();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18152B] select-none font-mono text-white flex flex-col justify-between">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1736] via-[#33224B] to-[#713959]" />

        <div className="absolute top-0 left-0 right-0 h-40">
          <div className="absolute top-4 left-10 w-1.5 h-1.5 bg-white opacity-80" />
          <div className="absolute top-8 left-36 w-1 h-1 bg-[#FDE047] opacity-90" />
          <div className="absolute top-14 left-72 w-1.5 h-1.5 bg-white opacity-60" />
          <div className="absolute top-6 left-1/3 w-1 h-1 bg-[#FEF08A] opacity-75" />
          <div className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-white opacity-90" />
          <div className="absolute top-5 right-72 w-1 h-1 bg-[#FDE047] opacity-80" />
        <div className="absolute top-10 right-32 w-1.5 h-1.5 bg-white opacity-70" />
          <div className="absolute top-16 right-12 w-1 h-1 bg-white opacity-85" />
        </div>

        <div className="absolute bottom-36 left-0 right-0 h-44 opacity-80 flex items-end">
          <div className="w-16 h-28 bg-[#231E3D] mx-1 relative">
            <div className="absolute top-3 left-2 w-1.5 h-2 bg-[#FACC15] opacity-80" />
            <div className="absolute top-7 left-2 w-1.5 h-2 bg-[#FACC15] opacity-80" />
            <div className="absolute top-11 left-2 w-1.5 h-2 bg-[#FACC15] opacity-80" />
            <div className="absolute top-3 right-2 w-1.5 h-2 bg-[#38BDF8] opacity-70" />
            <div className="absolute top-7 right-2 w-1.5 h-2 bg-[#FACC15] opacity-80" />
          </div>
          <div className="w-20 h-40 bg-[#1D1836] mx-1 relative">
            <div className="absolute top-4 left-3 w-2 h-3 bg-[#FACC15] opacity-90" />
            <div className="absolute top-10 left-3 w-2 h-3 bg-[#38BDF8] opacity-80" />
            <div className="absolute top-16 left-3 w-2 h-3 bg-[#FACC15] opacity-90" />
            <div className="absolute top-22 left-3 w-2 h-3 bg-[#FACC15] opacity-90" />
            <div className="absolute top-4 right-3 w-2 h-3 bg-[#FACC15] opacity-90" />
            <div className="absolute top-10 right-3 w-2 h-3 bg-[#FACC15] opacity-90" />
            <div className="absolute top-16 right-3 w-2 h-3 bg-[#38BDF8] opacity-80" />
        </div>
          <div className="w-28 h-48 bg-[#282246] mx-1 relative">
            <div className="absolute top-6 left-4 w-2 h-2.5 bg-[#FDE047] opacity-85" />
            <div className="absolute top-12 left-4 w-2 h-2.5 bg-[#FDE047] opacity-85" />
            <div className="absolute top-18 left-4 w-2 h-2.5 bg-[#FDE047] opacity-85" />
            <div className="absolute top-6 right-4 w-2 h-2.5 bg-[#38BDF8] opacity-85" />
            <div className="absolute top-12 right-4 w-2 h-2.5 bg-[#FDE047] opacity-85" />
            <div className="absolute top-18 right-4 w-2 h-2.5 bg-[#FDE047] opacity-85" />
        </div>  
        <div className="w-24 h-32 bg-[#1C1736] mx-1 relative">
            <div className="absolute top-3 left-3 w-2 h-2 bg-[#FACC15]" />
            <div className="absolute top-7 left-3 w-2 h-2 bg-[#FACC15]" />
            <div className="absolute top-3 right-3 w-2 h-2 bg-[#FACC15]" />
          </div>
          <div className="w-32 h-36 bg-[#2B234C] mx-1" />
          <div className="w-20 h-44 bg-[#1E1938] mx-1" />
          <div className="w-28 h-30 bg-[#261F42] mx-1" />
          <div className="w-36 h-40 bg-[#1F1938] mx-1" />
          <div className="w-28 h-48 bg-[#29224A] mx-1" />
          <div className="w-32 h-34 bg-[#1D1737] mx-1" />
          <div className="w-40 h-44 bg-[#251E44] mx-1" />
        </div>
        <div className="absolute bottom-28 left-0 right-0 h-16 bg-gradient-to-b from-[#2E1E3D] to-[#1F1528] border-t-2 border-[#542B4C] opacity-90 overflow-hidden">
          <div className="w-full h-full flex flex-col justify-around opacity-40">
            <div className="w-full h-0.5 bg-[#FACC15]/40" />
            <div className="w-full h-0.5 bg-[#38BDF8]/40" />
            <div className="w-full h-0.5 bg-[#FACC15]/30" />
          </div>
        </div>