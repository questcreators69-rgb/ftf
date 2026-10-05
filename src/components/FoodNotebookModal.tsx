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
                CHEF'S FIELD COMPENDIUM & <FORMULARY>              </h2>              <span className="text-[10px] text-rose-200 block">
                Pantry Ingredients • Secret <Recipes>              </span>            </div>          </div>
          <button            onClick={onClose}
            className="w-6 h-6 bg-[#DC2626] hover:bg-[#B91C1C] border border-[#7F1D1D] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs active:translate-y-0.5"
          >
            <X className="w-4 h-4" />
          </button>        </div>
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
          <button            onClick={() => setTab('recipes')}
            className={`pb-1 px-3 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
              tab === 'recipes'
                ? 'bg-[#E5A93C] text-[#221808] border-2 border-[#8A5A0A] border-b-0 shadow-xs'
                : 'text-[#615344] hover:text-[#1F1914] bg-[#DECDB5]'
 }}</Recipes></FORMULARY>