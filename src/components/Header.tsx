import { Volume2, VolumeX, BarChart2, Calendar, Moon, BookOpen } from 'lucide-react';
import { GameMode, TimeOfDay } from '../types';

interface HeaderProps {
  money: number;
  level: number;
  timeOfDay: TimeOfDay;
  mode: GameMode;
  isMuted: boolean;
  discoveredCount: number;
  totalIngredients: number;
  isCompendiumOpen?: boolean;
  onToggleMute: () => void;
  onOpenNotebook: () => void;
  onToggleCompendium?: () => void;
  onChangeMode: (mode: GameMode) => void;
  onExitToMenu?: () => void;
}

export function Header({
  money,
  level,
  timeOfDay,
  mode,
isMuted,
  discoveredCount,
  totalIngredients,
  isCompendiumOpen = true,
  onToggleMute,
  onOpenNotebook,
  onToggleCompendium,
  onChangeMode,
  onExitToMenu,
}: HeaderProps) {
  const shiftTitle = {
    morning: 'MORNING SHIFT',
    afternoon: 'AFTERNOON RUSH',
    evening: 'EVENING RUSH',
  }[timeOfDay];

  return (
    <header className="w-full bg-[#181524] border-3 border-[#0B0910] p-2 sm:p-2.5 shadow-xl select-none font-mono text-xs flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center flex-wrap gap-3">
        <button
              onClick={onExitToMenu}
          title="Return to Home"
          className="flex items-center justify-between gap-3 bg-[#F3A41D] hover:bg-[#FBBF24] active:bg-[#D97706] border-3 border-[#452605] py-1.5 px-3 rounded-xs shadow-[2px-2px-0px-#000] cursor-pointer transition-transform active:translate-y-0.5"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-7 bg-[#E05206] border-2 border-[#361502] p-0.5 flex flex-col justify-between shrink-0 shadow-xs">
              <div className="w-3.5 h-2 bg-[#FEF08A] border border-[#78350F]" />
              <div className="flex justify-between w-full">
                <div className="w-2 h-2 bg-[#1C1917] border border-[#FEF08A]" />
                <div className="w-2 h-2 bg-[#1C1917] border border-[#FEF08A]" />
              </div>
            </div>
            <div className="text-left leading-tight">
              <div className="font-display font-black text-xs sm:text-sm tracking-wider text-[#1C1408] uppercase">
                FOOD TRUCK
            </div>
              <div className="font-display font-black text-sm sm:text-base tracking-widest text-[#1C1408] uppercase -mt-0.5">
                FORMULA
         </div>
            </div>
          </div>
          <div className="px-2 py-0.5 bg-[#181614] border-2 border-[#EAB308] text-[#FACC15] font-mono text-xs font-bold tracking-widest shadow-xs ml-2">
            L-{level}
          </div>
        </button>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#231F33] border border-[#3C3552] font-bold text-[#E5E0D8] text-[11px] shadow-xs">
          <Moon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{shiftTitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-0.5 bg-[#100E19] p-1 border border-[#2F2942]">
          <button
            onClick={() => onChangeMode('career')}
            className={`px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
              mode === 'career'
                ? 'bg-[#F3A41D] text-[#1C1408] border border-[#8A5A0A] shadow-xs'
                : 'text-[#968979] hover:text-[#EDE7DE]'
            }`}
          >
            Career
          </button>

          <button            onClick={() => onChangeMode('rush-hour')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
              mode === 'rush-hour'
                ? 'bg-[#F3A41D] text-[#1C1408] border border-[#8A5A0A] shadow-xs'
                : 'text-[#968979] hover:text-[#EDE7DE]'
            }`}
        >
            <BarChart2 className='me="w-3.5 h-3.5" />
            <span>Rush</span>
          </button>

          <button
            onClick={() => onChangeMode('daily')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
              mode === 'daily'
                ? 'bg-[#F3A41D] text-[#1C1408] border border-[#8A5A0A] shadow-xs'
                : 'text-[#968979] hover:text-[#EDE7DE]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily</span>
          </button>
        </div>

        <div className="px-3.5 py-1.5 bg-[#0F0E16] border border-[#3A334F] flex items-center gap-1.5 shadow-inner">
          <span className="text-[11px] text-[#A89E91] font-bold">TILL:</span>          <span className="font-display font-black text-base text-[#FACC15] tracking-wider">
            ₹{money}
          </span>
        </div>
        
        