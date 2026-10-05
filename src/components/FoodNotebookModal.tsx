import { useState } from 'react';
import { X, Lock, Award } from 'lucide-react';
import { Ingredient, Recipe } from '../types';
import { FoodIllustration } from './FoodIllustration';

interface FoodNotebookModalProps {
  isOpen: boolean;
  ingredients: Ingredient[];
  unlockedIngredientIds: string[];
  recipes: Recipe[];
  discoveredRecipeIds: string[];
  onClose: () => void;
}

export function FoodNotebookModal({
  isOpen,
  ingredients,
  unlockedIngredientIds,
  recipes,
  discoveredRecipeIds,
  onClose,
}: FoodNotebookModalProps) {
  const [tab, setTab] = useState<'ingredients' | 'recipes'>('ingredients');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-xs font-mono select-none">
      <div className="w-full max-w-3xl bg-[#FAF3DE] text-[#1E1B18] border-4 border-[#1A1612] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />

        <div className="bg-[#991B1B] border-b-3 border-[#5C0F0F] text-white p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FACC15] border border-[#854D0E] text-[#713F12] flex items-center justify-center font-bold shadow-xs">
              <svg viewBox="0 0 16 16" className="w-4 h-4" shapeRendering="crispEdges">
                <rect x="2" y="2" width="12" height="12" fill="#FEF08A" />
                <rect x="4" y="4" width="8" height="1" fill="#713F12" />
                <rect x="4" y="6" width="8" height="1" fill="#713F12" />
                <rect x="4" y="8" width="6" height="1" fill="#713F12" />
                <rect x="4" y="10" width="8" height="1" fill="#713F12" />
                <rect x="1" y="2" width="2" height="12" fill="#CA8A04" />
              </svg>            </div>
            <div>
              <h2 className="font-display font-black text-sm sm:text-base uppercase tracking-wide text-white leading-tight">
                CHEF'S FIELD COMPENDIUM & FORMULARY
             </h2>
              <span className="text-[10px] text-rose-200 block">
                Pantry Ingredients • Secret Recipes 
             </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-[#DC2626] hover:bg-[#B91C1C] border border-[#7F1D1D] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs active:translate-y-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex border-b-2 border-[#D8C7A9] bg-[#EFE5CF] px-3 pt-2 gap-2">
          <button            onClick={() => setTab('ingredients')}
            className={`pb-1 px-3 text-xs font-bold transition-colors cursor-pointer uppercase ${
              tab === 'ingredients'
                ? 'bg-[#E5A93C] text-[#221808] border-2 border-[#8A5A0A] border-b-0 shadow-xs'
                : 'text-[#615344] hover:text-[#1F1914] bg-[#DECDB5]'
            }`}
          >
            PANTRY INDEX ({unlockedIngredientIds.length}/{ingredients.length})
          </button>
          
        <button
            onClick={() => setTab('recipes')}
            className={`pb-1 px-3 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
              tab === 'recipes'
                ? 'bg-[#E5A93C] text-[#221808] border-2 border-[#8A5A0A] border-b-0 shadow-xs'
                : 'text-[#615344] hover:text-[#1F1914] bg-[#DECDB5]'
        }`}
        >
        <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>SECRET FORMULAS ({discoveredRecipeIds.length}/{recipes.length})</span>
          </button> 
       </div>
        <div className="p-3 overflow-y-auto flex-1 space-y-2 pixel-scrollbar">
          {tab === 'ingredients' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map(ing => {
                const isUnlocked = unlockedIngredientIds.includes(ing.id);

                if (!isUnlocked) {
                  return (
                    <div
                      key={ing.id}
                      className="border-2 border-dashed border-[#C7B59A] bg-[#EDE2CE]/70 p-2.5 flex items-center gap-2.5 opacity-75"
                    >
                      <div className="w-8 h-8 bg-[#D8C6AC] border border-[#B5A186] flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-[#756450]" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#524436] truncate">{ing.name}</div>
                        <div className="text-[10px] text-[#8C7A65] font-bold">
                          UNLOCKED AT LEVEL {ing.unlockedAtLevel}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div                    key={ing.id}
                    className="border-2 border-[#D8C7AA] bg-[#FAF5E8] p-2 flex flex-col justify-between gap-1.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <FoodIllustration id={ing.id} className="w-10 h-10 shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-[#1F1C18] truncate leading-tight">
                            {ing.name}
                          </div>
                          <div className="text-[9px] text-[#7A6C5B] truncate mt-0.5 font-bold">
                            {ing.servingGrams}g portion • {ing.badge}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5 shrink-0">
                        {ing.diet === 'vegan' && (
                        <span className="bg-[#4ADE80] text-[#14532D] border border-[#16A34A] px-1 py-0.2 text-[8px] font-bold uppercase">
                            VEGAN
                         </span>
                        )}
                        {ing.diet === 'vegetarian' && (
                          <span className="bg-[#FDE047] text-[#854D0E] border border-[#EAB308] px-1 py-0.2 text-[8px] font-bold uppercase">
                            VEG
                          </span>
                        )}
                        {ing.allergens.map(al => (
                          <span
                            key={al}
                            className="bg-[#F472B6] text-[#831843] border border-[#DB2777] px-1 py-0.2 text-[8px] font-bold uppercase"
                          >
                            {al}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#EFE5CF] border border-[#DECBB0] p-1 grid grid-cols-5 text-center text-[9px] text-[#332A20] font-bold">
                      <div>
                        <div className="text-[8px] text-[#7A6C5B]">CAL</div>
                        <div>{ing.nutrition.calories}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#7A6C5B]">PROT</div>
                        <div>{ing.nutrition.protein}g</div>
                      </div>                      <div>
                        <div className="text-[8px] text-[#7A6C5B]">CARB</div>
                        <div>{ing.nutrition.carbohydrates}g</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#7A6C5B]">FAT</div>
                        <div>{ing.nutrition.fat}g</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[#7A6C5B]">FIBR</div>
                        <div>{ing.nutrition.fiber}g</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipes.map(recipe => {
                const isDiscovered = discoveredRecipeIds.includes(recipe.id);

                if (!isDiscovered) {
                  return (
                    <div
                      key={recipe.id}
                      className="border-2 border-dashed border-[#C7B59A] bg-[#EDE2CE]/70 p-2.5 flex items-center gap-2.5 opacity-75"
                    >
                      <div className="w-8 h-8 bg-[#D8C6AC] border border-[#B5A186] flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-[#756450]" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#524436]">Secret Formula ???</div>
                        <div className="text-[10px] text-[#8C7A65]">Combine matching items on plate</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={recipe.id}
                    className="border-2 border-[#D8C7AA] bg-[#FAF5E8] p-2 flex flex-col justify-between gap-1 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#1F1C18]">{recipe.name}</div>
                        <span className="bg-[#FEF08A] text-[#854D0E] border border-[#FACC15] text-[10px] font-bold px-1.5 py-0.5">
                          +₹{recipe.bonus
              }
                        </span>
                      </div>
                      <p className="text-xs text-[#6B5E4F] mt-1">{recipe.description}</p>
                    </div>

                    <div className="text-[9px] text-[#15803D] font-bold">
                      DISCOVERED FORMULA
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-2.5 bg-[#EFE5CF] border-t-2 border-[#DECBB0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#991B1B] hover:bg-[#B91C1C] text-white border-2 border-[#5C0F0F] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md active:translate-y-0.5"
          >
            CLOSE COMPENDIUM
          </button>
        </div>
      </div>
    </div>
  );
}
 