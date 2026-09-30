import { CheckCircle2, AlertCircle } from 'lucide-react';
import { TargetStatus, Nutrition } from '../types';

interface NutritionPanelProps {
  targets: TargetStatus[];
  totalNutrition: Nutrition;
}

export function NutritionPanel({ targets, totalNutrition }: NutritionPanelProps) {
  return (
    <div className="bg-[#FAF6EE] rounded-lg border border-[#D8CEBE] shadow-paper p-3.5 space-y-3 font-mono">
      <div className="flex items-center justify-between border-b border-[#E0D5C3] pb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5E50]">
          MACRONUTRIENT CALIBRATION
        </span>
        <span className="text-[10px] text-[#918170]">LIVE GAUGE</span>
      </div>

      <div className="space-y-3">
        {targets.map(target => {
          let percentage = 0;
          let isExceeded = false;

          if (target.min !== undefined) {
            percentage = Math.min(100, Math.round((target.current / target.min) * 100));
          } else if (target.max !== undefined) {
            percentage = Math.min(100, Math.round((target.current / target.max) * 100));
            if (target.current > target.max) {
              isExceeded = true;
            }
          }

          let barColor = 'bg-[#40382E]';
          if (isExceeded) {
            barColor = 'bg-rose-600';
          } else if (target.isMet) {
            barColor = 'bg-emerald-700';
          } else if (percentage > 50) {
            barColor = 'bg-amber-600';
          }

          return (
            <div key={target.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#1F1C18]">
                  <span className="tracking-tight">{target.label}</span>
                  {target.isMet ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 inline" />
                  ) : isExceeded ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 inline" />
                  ) : null}
                </div>
                <div className="text-xs">
                <span className={`font-bold ${
                    isExceeded
                      ? 'text-rose-700'
                      : target.isMet
                      ? 'text-emerald-800'
                      : 'text-[#1F1C18]'
                }`}>
                    {target.current}
                  </span>
                  <span className="text-[#877867] text-[11px]">
                    {target.min !== undefined && ` / min ${target.min}${target.unit}`}
                    {target.max !== undefined && ` / max ${target.max}${target.unit}`}
                  </span>
                </div>
              </div>

              <div className="w-full h-2 bg-[#E2D6C2] rounded-xs overflow-hidden border border-[#D1C3AB]">
                <div
                  className={`h-full transition-all duration-200 ${barColor}`}
                  style={{ width: `${Math.max(2, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#E0D5C3]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#756758] mb-1.5">
          TRAY METRIC TOTALS
        </div>
        <div className="grid grid-cols-5 gap-1.5 text-center">
          <div className="bg-[#EFE7D8] p-1.5 rounded-xs border border-[#DBD0BD]">
            <div className="text-[9px] text-[#695D50] uppercase font-bold">KCAL</div>
            <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
              {totalNutrition.calories}
            </div>
          </div>
          <div className="bg-[#EFE7D8] p-1.5 rounded-xs border border-[#DBD0BD]">
            <div className="text-[9px] text-[#695D50] uppercase font-bold">PROT</div>
            <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
              {totalNutrition.protein}g
            </div>
          </div>
          <div className="bg-[#EFE7D8] p-1.5 rounded-xs border border-[#DBD0BD]">
            <div className="text-[9px] text-[#695D50] uppercase font-bold">CARB</div>
            <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
              {totalNutrition.carbohydrates}g
            </div>
          </div>
          <div className="bg-[#EFE7D8] p-1.5 rounded-xs border border-[#DBD0BD]">
            <div className="text-[9px] text-[#695D50] uppercase font-bold">FAT</div>
            <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
              {totalNutrition.fat}g
            </div>
          </div>
          <div className="bg-[#EFE7D8] p-1.5 rounded-xs border border-[#DBD0BD]">
            <div className="text-[9px] text-[#695D50] uppercase font-bold">FIBR</div>
            <div className="text-xs font-bold text-[#1C1A17] mt-0.5">
              {totalNutrition.fiber}g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}