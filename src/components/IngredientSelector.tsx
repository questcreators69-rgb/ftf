import { useState } from 'react';
import { Ingredient, IngredientCategory, SelectedIngredient } from '../types';
import { Lock, Plus } from 'lucide-react';
import { FoodIllustration } from './FoodIllustration';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  unlockedIngredientIds: string[];
  plate: SelectedIngredient[];
  currentLevel: number;
  isCompendiumOpen?: boolean;
  onToggleCompendium?: () => void;
  onSelectIngredient: (ingredient: Ingredient) => void;
}

export function IngredientSelector({
  ingredients,
  unlockedIngredientIds,
  plate,
  currentLevel,
  isCompendiumOpen = true,
  onToggleCompendium,
  onSelectIngredient,
}: IngredientSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL PANTRY' },
    { id: 'base', label: 'BASES' },
    { id: 'protein', label: 'PROTEINS' },
    { id: 'vegetable', label: 'VEGETABLES' },
    { id: 'topping', label: 'TOPPINGS' },
  { id: 'sauce', label: 'SAUCES' },
  ];

  const filteredIngredients = ingredients.filter(ing => {
    if (activeCategory === 'all') return true;
    return ing.category === (activeCategory as IngredientCategory);
  });

  return (
    <div className="w-full bg-[#FAF3DE] border-3 border-[#1A1612] rounded-xs shadow-2xl relative select-none font-mono text-xs flex flex-col overflow-hidden">
      <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />

      <div className="absolute -top-2 left-6 w-3.5 h-3.5 rounded-full bg-[#B91C1C] border-2 border-[#520B0B] z-20 shadow-xs flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-[#FEF2F2]" />
      </div>
      <div className="p-2 border-b-2 border-[#DECDB3] flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#8B5A2B] border-2 border-[#4A2D11] p-0.5 flex flex-col justify-between shrink-0 shadow-xs">
            <div className="flex justify-between w-full">
              <div className="w-1 h-1 bg-[#D49B55]" />
              <div className="w-1 h-1 bg-[#D49B55]" />
            </div>
            <div className="w-full h-0.5 bg-[#4A2D11]" />
            <div className="flex justify-between w-full">
              <div className="w-1 h-1 bg-[#D49B55]" />
              <div className="w-1 h-1 bg-[#D49B55]" />
            </div>
          </div>
          <h2 className="font-display font-black text-sm tracking-wider text-[#1F1914] uppercase leading-none">
            PANTRY
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-0.5 text-[9px] font-bold transition-all cursor-pointer uppercase ${
                  isActive
                    ? 'bg-[#181614] text-[#FACC15] border-2 border-[#EAB308] shadow-xs'
                    : 'text-[#695A4B] hover:text-[#1F1914] bg-[#EBE0C8] border border-[#D5C6AA]'
                }`}
              >
                {cat.label}
              </button>
          );
})}

          {!isCompendiumOpen && onToggleCompendium && (
            <button
              onClick={onToggleCompendium}
              title="Show Chef Compendium"
              className="ml-1 px-2 py-0.5 text-[9px] font-bold bg-[#991B1B] hover:bg-[#B91C1C] text-white border border-[#5C0F0F] transition-all cursor-pointer uppercase shadow-xs"
            >
              + COMPENDIUM
            </button>
          )}
        </div>
      </div>

      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-1.5 max-h-[220px] overflow-y-auto pixel-scrollbar">
        {filteredIngredients.map(ing => {
          const isUnlocked = ing.unlockedAtLevel <= currentLevel || unlockedIngredientIds.includes(ing.id);
          const plateItem = plate.find(p => p.ingredient.id === ing.id);
          const currentCount = plateItem ? plateItem.count : 0;

          const categoryDisplay = {
            base: 'Base',
            protein: 'Protein',
            vegetable: 'Veg',
            topping: 'Topping',
            sauce: 'Sauce',
        }[ing.category];

          if (!isUnlocked) {
            return (
              <div
                key={ing.id}
                className="bg-[#EFE5CF]/80 border-2 border-dashed border-[#D1BEA0] p-1.5 flex flex-col justify-between opacity-60 select-none"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="opacity-40 grayscale shrink-0">
                    <FoodIllustration id={ing.id} className="w-9 h-9" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] text-[#4A3B2C] leading-snug break-words">
                        {ing.name}
                      </span>
                      <Lock className="w-3 h-3 text-[#736353] shrink-0" />
                    </div>
                    <span className="text-[9px] text-[#736353] block font-bold uppercase mt-0.5">
                      LVL {ing.unlockedAtLevel} LOCK
                    </span>
                  </div>
                </div>
                <div className="text-[9px] text-[#857463] mt-1 font-bold">
                  {ing.servingGrams}g portion
                </div>
              </div>
            );
          }

          return (
            <div
              key={ing.id}
              className={`bg-[#FAF5E8] border-2 p-1.5 flex flex-col justify-between gap-1 shadow-xs transition-all ${
                currentCount > 0 ? 'border-[#EAB308] bg-[#FFFBEB] ring-1 ring-[#EAB308]/40' : 'border-[#D9CDB8]'
              }`}
            >
            <div className="flex items-start justify-between gap-1">
                <div className="shrink-0">
                  <FoodIllustration id={ing.id} className="w-9 h-9" />
                </div>
                <div className="flex-1 min-w-0 px-1">
                  <div className="font-bold text-xs text-[#1F1914] leading-snug break-words">
                    {ing.name}
                  </div>                  <div className="text-[9px] text-[#786958] font-bold mt-0.5">
                    {ing.servingGrams}g • {categoryDisplay}
                  </div>
                </div>
                <button
                  onClick={() => onSelectIngredient(ing)}
                  title="Add to tray"
                  className="w-5 h-5 bg-[#FDE047] hover:bg-[#FACC15] active:bg-[#EAB308] text-[#713F12] border border-[#CA8A04] flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer shrink-0 active:translate-y-0.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="bg-[#EFE5CF] border border-[#DECBB0] px-1 py-0.5 text-[9px] text-[#2E241A] font-bold grid grid-cols-2 gap-x-1.5">
                <div>P: {ing.nutrition.protein}g</div>
                <div>C: {ing.nutrition.carbohydrates}g</div>
                <div>Cal: {ing.nutrition.calories}</div>
                <div>Fib: {ing.nutrition.fiber}g</div>
              </div>
              <div className="flex flex-wrap items-center gap-1">
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
                {ing.allergens.map(allergen => (
                  <span
                    key={allergen}
                    className="bg-[#F472B6] text-[#831843] border border-[#DB2777] px-1 py-0.2 text-[8px] font-bold uppercase"
                    >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}