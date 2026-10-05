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
          <div className="w-full h-full opacity-20 bg-[radial-gradient(#1A1612_1px,transparent_1px)] [background-size:12px_12px]" />
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
          <div className="w-4 h-6 bg-[#EAB308] border-2 border-[#1A1612] rounded-t-sm shadow-[0_0_24px_#FACC15]" />
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
                        <div className="w-8 h-2 bg-[#DC2626]" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-[#422b18] border-t-2 border-[#1a1612] relative z-20 flex justify-end gap-1 px-2 items-center">
                    <div className="w-2 h-4 bg-[#DC2626] border border-[#7f1d1d] -mt-2" />
                    <div className="w-2 h-4 bg-[#facc15] border border-[#854d0e] -mt-2" />
                  </div>
                </div>
              </div>
              <div className="absolute top-10 left-20 right-4 h-10 flex overflow-hidden z-20">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
                  <div
                    key={n}
                    className={`flex-1 h-full border-b-3 border-x border-[#1a1612] ${
                      n % 2 === 0 ? 'bg-[#DC2626]' : 'bg-white'
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
              <div className="absolute inset-0 bg-[radial-gradient(#166534_4px,transparent_4px)] [background-size:16px_16px]" />
            </div>
            <div className="w-10 h-32 bg-[#451A03] border-2 border-[#1A1612] -mt-10" />

            <div className="absolute top-14 right-2 w-14 h-28 bg-[#FAF3DE] border-2 border-[#1A1612] p-1 shadow-md flex flex-col items-center justify-between text-center rotate-3">
              <span className="text-[8px] text-[#451A03] font-black uppercase leading-tight">
                GOOD<br />FOOD<br />BRIGHTER<br />DAYS
              </span>
              <span className="text-[#DC2626] text-xs">♥</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="w-full flex justify-end">
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="w-8 h-8 bg-[#2B231D]/90 hover:bg-[#3D332B] border-2 border-[#1A1612] text-[#FACC15] flex items-center justify-center cursor-pointer shadow-md active:translate-y-0.5"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex flex-col items-start gap-4 sm:gap-6 my-auto max-w-xl">
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
              <div className="w-6 h-10 border-r-4 border-[#92400E] rotate-[-35deg] -mr-1" />
              <div className="w-14 sm:w-16 h-10 sm:h-12 bg-white border-3 border-[#1A1612] rounded-t-xl relative shadow-md flex flex-col items-center justify-center">
                <div className="w-6 h-1.5 bg-[#E5E5E5] -mt-1" />
                <div className="w-8 h-1 bg-[#E5E5E5] mt-1" />
              </div>
              <div className="w-6 h-10 border-l-4 border-[#92400E] rotate-[35deg] -ml-1" />
            </div>
            <div className="bg-[#991B1B] border-4 border-[#3D0A0A] rounded-lg p-3 sm:p-4 shadow-[6px_6px_0px_#140707] relative pt-6 sm:pt-7 text-center">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-[#FACC15] border border-[#78350F]" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FACC15] border border-[#78350F]" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-[#FACC15] border border-[#78350F]" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-[#FACC15] border border-[#78350F]" />

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase drop-shadow-[3px_3px_0px_#140707] leading-tight">
                FOOD TRUCK
              </h1>
              <div className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-widest text-[#FACC15] uppercase drop-shadow-[3px_3px_0px_#78350F] -mt-1 sm:-mt-2">
                FORMULA
              </div>
              <div className="mt-2 sm:mt-3 bg-[#451A03] border-2 border-[#1A1612] py-1 px-3 sm:px-6 rounded-xs">
                <span className="font-display font-bold text-[10px] sm:text-xs tracking-widest text-[#FDE047] uppercase">
                  COOK • SERVE • BALANCE • GROW
                </span>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-80 flex flex-col gap-2.5">
            <button
              onClick={handleStart}
              className="w-full py-3.5 sm:py-4 px-6 bg-[#F59E0B] hover:bg-[#FBBF24] active:bg-[#D97706] text-[#1C1408] border-4 border-[#451A03] font-display font-black text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_#2B1102] transition-transform active:translate-y-1 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START COOKING</span>
            </button>
            <button
              onClick={() => {
                sound.playTick();
                setActiveModal('howToPlay');
            }}
              className="w-full py-2.5 sm:py-3 px-5 bg-[#3B2B20] hover:bg-[#4E392B] active:bg-[#2B1F17] text-[#EDE7DC] border-3 border-[#1A120D] font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_#140E0A] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#FDE047]" />
              <span>HOW TO PLAY</span>
            </button>
            <button
              onClick={() => {
                sound.playTick();
                setActiveModal('leaderboard');
            }}
              className="w-full py-2.5 sm:py-3 px-5 bg-[#3B2B20] hover:bg-[#4E392B] active:bg-[#2B1F17] text-[#EDE7DC] border-3 border-[#1A120D] font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_#140E0A] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-[#38BDF8]" />
              <span>LEADERBOARD</span>
            </button>

            <button
              onClick={() => {
                sound.playTick();
                setActiveModal('settings');
                }}
                className="w-full py-2.5 sm:py-3 px-5 bg-[#3B2B20] hover:bg-[#4E392B] active:bg-[#2B1F17] text-[#EDE7DC] border-3 border-[#1A120D] font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_#140E0A] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#A8A29E]" />
              <span>SETTINGS</span>
            </button>
          </div>
        </div>
      </div>
      {activeModal === 'howToPlay' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF3DE] text-[#1E1B18] border-4 border-[#1A1612] shadow-2xl p-4 flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-[#D8C7A9] pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#991B1B]" />
                <h2 className="font-display font-black text-base uppercase text-[#1E1B18]">
                  HOW TO PLAY 
                </h2>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-6 h-6 bg-[#991B1B] text-white flex items-center justify-center font-bold border border-[#5C0F0F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-[#3D332A]">
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-2.5">
                <span className="font-bold text-[#991B1B] block text-xs">1. READ THE TICKET:</span>
                Each customer has strict rules: diets (Vegan, Vegetarian, Gluten-Free), minimum/maximum calories, protein, and hard restrictions.
              </div>
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-2.5">
                <span className="font-bold text-[#991B1B] block text-xs">2. ASSEMBLE THE PLATE:</span>
                Tap pantry ingredients to add portions onto your tray (up to 5 portions). Combine bases, proteins, veggies, toppings, and sauces to match requirements.
              </div>
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-2.5">
                <span className="font-bold text-[#991B1B] block text-xs">3. SERVE BEFORE EXPIRY:</span>
                Once all conditions turn green (<span className="text-[#15803D] font-bold">SATISFIED</span>), hit <span className="bg-[#181614] text-[#FACC15] px-1 font-bold">[SPACE]</span> or click SERVE PLATE to collect your payout and tips!
              </div>
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-2.5">
                <span className="font-bold text-[#991B1B] block text-xs">4. UPGRADE & DISCOVER:</span>
                Keep serving to level up your food truck, unlock new ingredients, and discover secret recipes for big bonuses.
              </div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 bg-[#991B1B] hover:bg-[#B91C1C] text-white border-2 border-[#5C0F0F] font-bold text-xs uppercase cursor-pointer"
            >
              GOT IT, CHEF!
            </button>
          </div>
        </div>
      )}

      {activeModal === 'leaderboard' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF3DE] text-[#1E1B18] border-4 border-[#1A1612] shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-2 border-[#D8C7A9] pb-2">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#38BDF8]" />
                <h2 className="font-display font-black text-base uppercase text-[#1E1B18]">
                  CAREER LEADERBOARD & RECORDS
                </h2>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-6 h-6 bg-[#991B1B] text-white flex items-center justify-center font-bold border border-[#5C0F0F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#EFE5CF] border border-[#DECBB0] p-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#D8C7A9] pb-1">
                <span>Truck Level:</span>
                <span className="font-bold text-[#991B1B]">Level {stats.level}</span>
              </div>
              <div className="flex justify-between border-b border-[#D8C7A9] pb-1">
                <span>Total Till Collected:</span>
                <span className="font-bold text-[#15803D]">₹{stats.money}</span>
              </div>
              <div className="flex justify-between border-b border-[#D8C7A9] pb-1">
                <span>Orders Served:</span>
                <span className="font-bold">{stats.ordersServed} orders</span>
              </div>
              <div className="flex justify-between border-b border-[#D8C7A9] pb-1">
                <span>Orders Failed:</span>
                <span className="font-bold text-rose-700">{stats.ordersFailed} orders</span>
              </div>
              <div className="flex justify-between border-b border-[#D8C7A9] pb-1">
                <span>Best Service Streak:</span>
                <span className="font-bold text-[#EAB308]">{stats.bestStreak} streak</span>
              </div>
              <div className="flex justify-between">
                <span>Discovered Secret Recipes:</span>
                <span className="font-bold">{stats.discoveredRecipes.length} recipes</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 bg-[#991B1B] hover:bg-[#B91C1C] text-white border-2 border-[#5C0F0F] font-bold text-xs uppercase cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FAF3DE] text-[#1E1B18] border-4 border-[#1A1612] shadow-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-2 border-[#D8C7A9] pb-2">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#78350F]" />
                <h2 className="font-display font-black text-base uppercase text-[#1E1B18]">
                  GAME SETTINGS
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setShowResetConfirm(false);
                }}
                className="w-6 h-6 bg-[#991B1B] text-white flex items-center justify-center font-bold border border-[#5C0F0F] cursor-pointer"
              >
              <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold block text-sm">Sound Effects</span>
                  <span className="text-[10px] text-[#786958]">Kitchen knocks, timer ticks, serve chimes</span>                </div>                <button                  onClick={handleToggleSound}
                  className={`px-3 py-1.5 font-bold border-2 cursor-pointer ${
                    isMuted                      ? 'bg-rose-200 border-rose-600 text-rose-900'
                      : 'bg-emerald-200 border-emerald-600 text-emerald-900'
                  }`}
                >
                  {isMuted ? 'MUTED' : 'ENABLED'}
                </button>
              </div>
              <div className="bg-[#EFE5CF] border border-[#DECBB0] p-3 flex flex-col gap-2">
                <div>
                  <span className="font-bold block text-sm">Reset Career Progress</span>                  <span className="text-[10px] text-[#786958]">Clear saved money, level, and recipe progress</span>                </div>
                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full py-1.5 bg-[#451A03] hover:bg-[#5C2304] text-white border-2 border-[#1A1612] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET SAVE DATA</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button                      onClick={() => {
                        onResetStats();
                        setShowResetConfirm(false);
                        setActiveModal(null);
                    }}
                      className="flex-1 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs border border-rose-950 cursor-pointer"
                    >
                      CONFIRM RESET
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-1.5 bg-stone-300 hover:bg-stone-400 text-stone-900 font-bold text-xs border border-stone-600 cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModal(null);
                setShowResetConfirm(false);
                }}
              className="w-full py-2 bg-[#991B1B] hover:bg-[#B91C1C] text-white border-2 border-[#5C0F0F] font-bold text-xs uppercase cursor-pointer"
            >
              SAVE & CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
              
        

    