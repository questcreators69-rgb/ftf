import { OrderValidationResult } from '../types';

interface RightActionPanelProps {
  ordersServedInLevel: number;
  ordersNeeded: number;
  validation: OrderValidationResult;
  plateLength: number;
  onServe: () => void;
}

export function RightActionPanel({
  ordersServedInLevel,
  ordersNeeded,
  validation,
  plateLength,
  onServe,
}: RightActionPanelProps) {
  const isReady = validation.isReady && !validation.hasHardViolation && plateLength > 0;
  const progressRatio = Math.min(1, ordersServedInLevel / ordersNeeded);

  return (
    <div className="w-full flex flex-col gap-2 select-none font-mono text-xs">
      <div className="bg-[#181614] border-3 border-[#2C2722] p-2.5 shadow-md flex flex-col gap-1.">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#A89C8D]">
          <span>SHIFT QUOTA</span>
          <span className="text-[#FACC15]">{ordersServedInLevel}/{ordersNeeded}</span>
        </div>
        <div className="w-full h-3 bg-[#0D0C0A] border border-[#2B251E] p-0.5">
          <div
            className="h-full bg-[#EAB308] transition-all duration-300"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
      </div>
      <div className="bg-[#181614] border-3 border-[#2C2722] p-2.5 shadow-md flex flex-col gap-2">
        <div className="text-[10px] font-bold tracking-wider text-[#A89C8D] uppercase">
          SATISFY NUTRITION & HARD RULES
        </div>
        <button
          onClick={onServe}
          disabled={!isReady}
          className={`w-full py-4 px-2 border-3 flex flex-col items-center justify-center text-center transition-all ${
            isReady
              ? 'bg-[#15803D] hover:bg-[#16A34A] border-[#4ADE80] text-white shadow-lg cursor-pointer active:translate-y-0.5'
              : 'bg-[#141311] border-[#2A2621] text-[#5C564D] cursor-not-allowed opacity-80'
          }`}
        >
          <span className={`font-display font-black text-base tracking-wider uppercase leading-tight ${
            isReady ? 'text-white' : 'text-[#635D54]'
          }`}>
            SERVE PLATE
          </span>

          <span className={`text-xs font-bold uppercase mt-0.5 ${
            isReady ? 'text-emerald-200' : 'text-[#524C44]'
          }`}>
            {isReady ? '(READY TO SERVE)' : '(INCOMPLETE)'}
          </span>

          <span className={`text-[9px] tracking-widest mt-2 uppercase ${
            isReady ? 'text-emerald-100' : 'text-[#47423B]'
          }`}>
            [SPACE] TO SERVE
          </span>
        </button>
      </div>
    </div>
  );
}