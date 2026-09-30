import { Trash2 } from 'lucide-react';
import { SelectedIngredient, OrderValidationResult } from '../types';
import { FoodIllustration } from './FoodIllustration';

interface PlateViewProps {
  plate: SelectedIngredient[];
  validation: OrderValidationResult;
  onRemoveItem: (ingredientId: string) => void;
  onClearPlate: () => void;
}

export function PlateView({
  plate,
  onRemoveItem,
  onClearPlate,
}: PlateViewProps) {
  const totalPortions = plate.reduce((sum, item) => sum + item.count, 0);

  const flatItems: { ingredient: SelectedIngredient['ingredient']; isSecond: boolean }[] = [];
  plate.forEach(item => {
    flatItems.push({ ingredient: item.ingredient, isSecond: false });
    if (item.count > 1) {
      flatItems.push({ ingredient: item.ingredient, isSecond: true });
    }
  });

  return (
    <div className="w-full flex flex-col select-none font-mono text-xs">
      <div className="w-full bg-[#3B281B] border-3 border-[#21150C] p-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-[#FACC15] text-sm">🍴</span>
          <span className="font-display font-black text-xs sm:text-sm text-[#FDF8F0] tracking-wider uppercase">
            PREP BOARD ({totalPortions} / 5 PORTIONS)
          </span>
        </div>
        {plate.length > 0 && (
          <button
            onClick={onClearPlate}
            className="flex items-center gap-1 text-[10px] text-[#E0D1BF] hover:text-rose-400 font-bold transition-colors cursor-pointer bg-[#24170E] px-2 py-0.5 border border-[#523A28]"
          >
            <Trash2 className="w-3 h-3" />
            <span>SCRAP</span>
          </button>
        )}
      </div>
      <div className="w-full bg-[#33323B] border-3 border-[#1A191F] border-t-0 p-2.5 shadow-xl flex flex-col md:flex-row items-stretch gap-2.5 relative">
        <div className="hidden lg:flex flex-col justify-end gap-1 pb-1">
          <div className="w-4 h-11 bg-[#B91C1C] border border-[#520B0B] rounded-t-sm flex flex-col items-center justify-between py-0.5">
            <div className="w-1.5 h-3 bg-[#FEF2F2] rounded-t-xs" />
            <div className="w-2.5 h-1 bg-[#7F1D1D]" />
          </div>          <div className="w-4 h-11 bg-[#EAB308] border border-[#713F12] rounded-t-sm flex flex-col items-center justify-between py-0.5">
            <div className="w-1.5 h-3 bg-[#FEF9C3] rounded-t-xs" />
            <div className="w-2.5 h-1 bg-[#854D0E]" />
          </div>        </div>
        <div className="flex-1 bg-[#242329] border-2 border-[#45434E] p-2 rounded-xs grid grid-cols-5 gap-1.5 items-center justify-center">
          {[0, 1, 2, 3, 4].map(slotIndex => {
            const item = flatItems[slotIndex];

            if (item) {
              return (
                <button
                  key={`${item.ingredient.id}-${slotIndex}`}
                  onClick={() => onRemoveItem(item.ingredient.id)}
                  title="Click to remove from tray"
                  className="group relative h-24 sm:h-28 bg-[#18171C] border-2 border-[#5C5966] hover:border-rose-500 p-1 flex flex-col items-center justify-between text-center transition-all cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <div className="w-full flex justify-end">
                    <span className="text-[9px] text-[#A69C8E] group-hover:text-rose-400 font-bold">
                      ✕
                    </span>
                  </div>
                  <div className="my-auto transform group-hover:scale-105 transition-transform">
                    <FoodIllustration id={item.ingredient.id} className="w-9 h-9" />
                  </div>
                  <div className="w-full">
                    <span className="text-[10px] font-bold text-[#F5EFE6] leading-none block truncate">
                      {item.ingredient.name}
                    </span>                    <span className="text-[9px] text-[#A89E91] block mt-0.5">
                      {item.ingredient.nutrition.protein}g P
                     </span>
                  </div>
                </button>
              );
            }

            return (
              <div
                key={`empty-slot-${slotIndex}`}
                className="h-24 sm:h-28 border-2 border-dashed border-[#4B4954] bg-[#1E1D22] flex flex-col items-center justify-center text-center p-1"
              >
                <div className="w-4 h-4 border border-[#3A3842] flex items-center justify-center text-[10px] font-bold text-[#575463]">
                  {slotIndex + 1}
                </div>
              </div>            );
          })}
        </div>
        <div className="w-full md:w-48 bg-[#18171C] border-2 border-[#383642] p-2.5 flex flex-col items-center justify-center text-center shadow-inner relative">
          <div className="text-[#C4B7A5] text-[11px] leading-relaxed font-bold">
            Select pantry items below to assemble formula!
          </div>
          <div className="mt-1 text-[#EAB308] text-base font-bold">
            ↴
          </div>
        </div>
      </div>
    </div>
  );
}