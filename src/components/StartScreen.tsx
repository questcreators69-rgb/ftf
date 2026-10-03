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
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#3A322C] border-t-4 border-[#221D1A]">
          <div className="w-full h-full opacity-20 bg-[radial-gradient(#1A1612-1px,transparent-1px)] [background-size:12px-12px]" />
        </div>
        <div className="absolute top-10 left-10 right-10 h-36">
          <svg className="w-full h-full" viewBox="0 0 1000 150" fill="none">
            <path d="M 50,60 Q 250,140 500,80 Q 750,140 950,50" stroke="#2B2117" strokeWidth="3" />
            {[
              [80, 75],
              [140, 95],
              [200, 110],
              [260, 115],
              [320, 110],
              [380, 98],
              [440, 85],
              [500, 80],
              [560, 92],
              [620, 108],
              [680, 118],
              [740, 118],
              [800, 105],
              [860, 88],
              [920, 65],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <line x1={cx} y1={cy - 8} x2={cx} y2={cy} stroke="#1C1814" strokeWidth="2" />
                <circle cx={cx} cy={cy + 4} r={6} fill="#FACC15" />
                <circle cx={cx} cy={cy + 4} r={12} fill="#FDE047" opacity="0.25" />
              </g>
            ))}
          </svg>
        </div>
        <div className="absolute bottom-28 left-6 sm:left-14 flex flex-col items-center">
          <div className="w-4 h-6 bg-[#EAB308] border-2 border-[#1A1612] rounded-t-sm shadow-[0-0-24px-#FACC15]" />
          <div className="w-2.5 h-36 bg-[#1A1612]" />
          <div className="w-6 h-6 bg-[#2B231D] border-2 border-[#1A1612]" />
        </div>
        <div className="absolute bottom-6 right-2 sm:right-12 lg:right-20 flex items-end">
          <div className="relative">
            <div className="w-[340px] sm:w-[480px] lg:w-[560px] h-[260px] sm:h-[300px] relative">
              <div className="absolute bottom-6 left-0 right-0 h-44 bg-[#C22323] border-4 border-[#1A1612] rounded-r-md">
                <div className="absolute top-0 left-0 w-24 h-full bg-[#E22E2E]" />
                <div className="absolute bottom-2 left-6 w-14 h-14 rounded-full bg-[#1A1612] border-4 border-[#78716C] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#E5E5E5] border-2 border-[#1A1612]" />
                </div>
                <div className="absolute bottom-2 right-12 w-14 h-14 rounded-full bg-[#1A1612] border-4 border-[#78716C] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#E5E5E5] border-2 border-[#1A1612]" />
                </div>
                <div className="absolute top-2 left-3 w-16 h-20 bg-[#FAF3DE] border-2 border-[#1A1612] p-1">
                  <div className="w-full h-full bg-[#38BDF8] border border-[#1A1612] opacity-80" />
                </div>
                <div className="absolute top-2 left-24 right-6 h-28 bg-[#181614] border-3 border-[#1A1612] p-2 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FEF08A]/15 to-transparent pointer-events-none" />

                  <div className="flex justify-between items-center z-10 border-b border-[#3E372E] pb-1">
                    <div className="flex gap-1">
                      <div className="w-3 h-4 bg-[#B91C1C] border border-[#520B0B]" />
                      <div className="w-3 h-5 bg-[#D97706] border border-[#78350F]" />
                      <div className="w-3 h-4 bg-[#15803D] border border-[#052E16]" />
                    </div>                    <div className="flex gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#383127] border border-[#5E5242]" />
                      <div className="w-4 h-4 rounded-full bg-[#383127] border border-[#5E5242]" />
                    </div>
                  </div>
                  <div className="flex justify-center items-end relative z-10 -mb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-8 bg-white border-2 border-[#1A1612] rounded-t-lg relative flex items-center justify-center">
                        <div className="w-4 h-1 bg-[#D9D9D9] -mt-1" />
                      </div>
                      <div className="w-10 h-8 bg-[#FED7AA] border-x-2 border-[#1A1612] relative flex flex-col items-center justify-center">
                        <div className="w-6 h-3 bg-[#78350F] -mt-1" />
                        <div className="flex gap-2 mt-1">
                          <div className="w-1 h-1.5 bg-[#1A1612]" />
                          <div className="w-1 h-1.5 bg-[#1A1612]" />
                        </div>
                        <div className="w-2.5 h-0.5 bg-[#DC2626] mt-0.5" />
                      </div>
                      <div className="w-14 h-6 bg-white border-2 border-[#1A1612] rounded-t-xs flex items-center justify-center">
                        <div className="w-8 h-2 bg-[#dc2626]" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-[#422b18] border-t-2 border-[#1a1612] relative z-20 flex justify-end gap-1 px-2 items-center">
                    <div className="w-2 h-4 bg-[#dc2626] border border-[#7f1d1d] -mt-2" />
                    <div className="w-2 h-4 bg-[#facc15] border border-[#854d0e] -mt-2" />
                  </div>                </div>              </div>
              <div className="absolute top-10 left-20 right-4 h-10 flex overflow-hidden z-20">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
                  <div                    key={n}
                    className={`flex-1 h-full border-b-3 border-x border-[#1a1612] ${
                      n % 2 === 0 ? 'bg-[#dc2626]' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-4 left-32 w-28 h-6 bg-[#38312B] border-2 border-[#1A1612] z-10" />

              <div className="absolute bottom-1 right-2 w-14 h-24 bg-[#1E1B18] border-2 border-[#1A1612] p-1.5 flex flex-col items-center justify-between text-center z-30">
                <span className="text-[7px] text-[#E5E0D8] font-bold leading-tight uppercase">
                  GOOD<br />FOOD<br />BRIGHT<br />DAYS
                </span>
                <span className="text-[#DC2626] text-xs">♥</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-28 sm:left-36 flex gap-6 z-30">
              <div className="flex flex-col items-center">
                <div className="w-8 h-2 bg-[#78350F] border border-[#1A1612] rounded-xs" />
                <div className="w-6 h-10 border-x-2 border-[#451A03]" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-2 bg-[#78350F] border border-[#1A1612] rounded-xs" />
                <div className="w-6 h-10 border-x-2 border-[#451A03]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-10 sm:left-14 w-16 h-24 bg-[#2C241E] border-2 border-[#1A1612] p-1 z-30 flex flex-col items-center justify-between text-center shadow-md">
              <span className="text-[7px] text-[#EDE7DC] font-bold leading-tight uppercase mt-1">
                SERVE<br />TASTY<br />FOOD<br />MAKE<br />HAPPY<br />PEOPLE
            </span>
              <span className="text-[#DC2626] text-[10px]">♥</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center -ml-6 -mb-6 relative z-10">
              <div className="w-48 h-64 bg-[#15803D] rounded-full border-4 border-[#0B3519] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#166534-4px,transparent-4px)] [background-size:16px-16px]" />
            </div>            <div className="w-10 h-32 bg-[#451A03] border-2 border-[#1A1612] -mt-10" />

            <div className="absolute top-14 right-2 w-14 h-28 bg-[#FAF3DE] border-2 border-[#1A1612] p-1 shadow-md flex flex-col items-center justify-between text-center rotate-3">
              <span childrenlassName="text-[8px] text-[#451A03] font-black uppercase leading-tight">
                GOOD<br />FOOD<br />BRIGHTER<br /><DAYS>              </span>              <span className=ame="text-[#DC2626] text-xs">♥</span>            </div>          </div>        </div>      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="w-full flex justify-end">
          
                       