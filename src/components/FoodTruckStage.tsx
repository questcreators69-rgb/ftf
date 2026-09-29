import { TRUCK_TIERS } from '../data/levels';
import { TruckTier, TimeOfDay } from '../types';
import { ChefHat } from 'lucide-react';

interface FoodTruckStageProps {
  tier: TruckTier;
  timeOfDay: TimeOfDay;
  ordersServedInLevel: number;
  ordersNeededToAdvance: number;
  levelName: string;
}

export function FoodTruckStage({
  tier,
  timeOfDay,
  ordersServedInLevel,
  ordersNeededToAdvance,
  levelName,
}: FoodTruckStageProps) {
  const truck = TRUCK_TIERS[tier] || TRUCK_TIERS[1];

  const skyAtmosphere = {
    morning: 'from-amber-100 via-orange-50 to-stone-100 border-amber-200/70',
    afternoon: 'from-sky-100 via-amber-50 to-stone-100 border-sky-200/70',
    evening: 'from-indigo-950 via-slate-900 to-stone-900 border-indigo-900/60 text-stone-100',
  }[timeOfDay];

  const isEvening = timeOfDay === 'evening';

  return (
    <div className={`relative overflow-hidden rounded-lg border p-3.5 mb-3.5 transition-colors duration-500 shadow-paper ${
      isEvening
        ? 'bg-[#1C1A17] border-[#36312B] text-stone-200'
        : 'bg-[#F9F5EC] border-[#E3DAC8] text-stone-900'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center border shadow-xs ${
            isEvening
              ? 'bg-[#292520] text-amber-400 border-[#3D372F]'
              : 'bg-[#ECE4D0] text-amber-800 border-[#D8CDAF]'
          }`}>
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isEvening ? 'text-amber-400' : 'text-amber-800'}`}>
                TIER {tier} / {truck.title}
              </span>
              <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs border ${
                isEvening ? 'bg-[#25221D] text-stone-300 border-[#3B352E]' : 'bg-[#EAE0CA] text-stone-800 border-[#D3C7AB]'
              }`}>
                {levelName}
            </span>
            </div>
            <p className={`text-xs mt-0.5 ${isEvening ? 'text-stone-400' : 'text-stone-600'}`}>
              {truck.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${isEvening ? 'text-stone-400' : 'text-stone-600'}`}>
                Shift Quota
          </span>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
            `  <div className={`w-32 sm:w-48 h-2 rounded-xs overflow-hidden border ${
                isEvening ? 'bg-[#151311] border-[#332E27]' : 'bg-[#E5DBC7] border-[#D1C5AC]'
            }`}>
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((ordersServedInLevel / Math.max(ordersNeededToAdvance, 1)) * 100))}%`,
                  }}
                />
              </div>
              <span className={`text-xs font-mono font-bold tracking-tight ${isEvening ? 'text-amber-400' : 'text-amber-800'}`}>
                {ordersServedInLevel}/{ordersNeededToAdvance}
              </span>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}