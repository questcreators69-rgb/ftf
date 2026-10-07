import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  SelectedIngredient,
  Ingredient,
  Order,
  OrderValidationResult,
  RewardBreakdown,
  Recipe,
  TimeOfDay,
  GameMode,
} from './types';
import { INGREDIENTS } from './data/ingredients';
import { RECIPES } from './data/recipes';
import { LEVEL_CONFIGS } from './data/levels';
import { getRandomFactForIngredients } from './data/facts';
import { calculatePlateNutrition } from './game/nutritionCalculator';
import { validateOrder } from './game/orderValidator';
import { generateOrder } from './game/orderGenerator';
import { calculateReward } from './game/scoring';
import { loadPlayerStats, savePlayerStats, INITIAL_STATS } from './game/storage';
import { sound } from './game/audio';

import { StartScreen } from './components/StartScreen';
import { Header } from './components/Header';
import { OrderTicket } from './components/OrderTicket';
import { PlateView } from './components/PlateView';
import { RightActionPanel } from './components/RightActionPanel';
import { IngredientSelector } from './components/IngredientSelector';
import { CompendiumBoard } from './components/CompendiumBoard';
import { ResultModal } from './components/ResultModal';
import { FoodNotebookModal } from './components/FoodNotebookModal';

export default function App() {
  const [gameState, setGameState] = useState<'TITLE' | 'COOKING'>('TITLE');
  const [stats, setStats] = useState(() => loadPlayerStats());
  const [mode, setMode] = useState<GameMode>('career');
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isCompendiumVisible, setIsCompendiumVisible] = useState(true);
  const [orderCount, setOrderCount] = useState(1);

  const [currentOrder, setCurrentOrder] = useState<Order>(() => {
    const initialPool = INGREDIENTS.filter(i => i.unlockedAtLevel <= 1);
    return generateOrder(1, initialPool, 1);
  });

  const [plate, setPlate] = useState<SelectedIngredient[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(currentOrder.timeLimitSec);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [lastReward, setLastReward] = useState<RewardBreakdown>({
    base: 0,
    perfectBonus: 0,
    streakBonus: 0,
    speedBonus: 0,
    preferenceBonus: 0,
    total: 0,
  });
  const [lastFact, setLastFact] = useState<string>('');
  const [discoveredRecipe, setDiscoveredRecipe] = useState<Recipe | null>(null);
  const [didLevelUp, setDidLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(stats.level);

  const plateNutrition = useMemo(() => {
    return calculatePlateNutrition(plate);
  }, [plate]);

const validation: OrderValidationResult = useMemo(() => {
    return validateOrder(currentOrder, plate, plateNutrition);
}, [currentOrder, plate, plateNutrition]);

  const ordersNeeded = LEVEL_CONFIGS[stats.level]?.ordersToAdvance || 6;
  const ordersServedInLevel = stats.ordersServed % ordersNeeded;

  const timeOfDay: TimeOfDay = useMemo(() => {
    if (ordersServedInLevel <= 1) return 'morning';
    if (ordersServedInLevel <= 3) return 'afternoon';
    return 'evening';
  }, [ordersServedInLevel]);

  const prevReadyRef = useRef(false);

  useEffect(() => {
    if (gameState !== 'COOKING') return;
    if (validation.isReady && !prevReadyRef.current) {
      sound.playOrderReady();
    }
    prevReadyRef.current = validation.isReady;
  }, [validation.isReady, gameState]);

  const handleOrderExpired = useCallback(() => {
    setIsExpired(true);
    setIsResultOpen(true);
    sound.playFailure();

    setStats(prev => {
      const next = {
        ...prev,
        ordersFailed: prev.ordersFailed + 1,
        currentStreak: 0,
      };
    savePlayerStats(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (gameState !== 'COOKING' || isResultOpen || isNotebookOpen) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleOrderExpired();
          return 0;
        }
        if (prev <= 5) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, isResultOpen, isNotebookOpen, handleOrderExpired]);

const handleSelectIngredient = (ingredient: Ingredient) => {
    const totalPortions = plate.reduce((sum, item) => sum + item.count, 0);
    if (totalPortions >= 5) {
      sound.playWarning();
      return;
    }

    const existingIndex = plate.findIndex(p => p.ingredient.id === ingredient.id);

    if (existingIndex >= 0) {
      const currentCount = plate[existingIndex].count;
      if (currentCount >= 2) {
        sound.playWarning();
        return;
      }
      setPlate(prev =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, count: item.count + 1 } : item
        )
      );
      sound.playAdd();
    } else {
      setPlate(prev => [...prev, { ingredient, count: 1 }]);
      sound.playAdd();
    }
};

  const handleRemoveItem = (ingredientId: string) => {
    setPlate(prev => {
      const existing = prev.find(p => p.ingredient.id === ingredientId);
      if (!existing) return prev;
      if (existing.count > 1) {
        return prev.map(p =>
          p.ingredient.id === ingredientId ? { ...p, count: p.count - 1 } : p
        );
      }
      return prev.filter(p => p.ingredient.id !== ingredientId);
    });
    sound.playRemove();
  };

  const handleClearPlate = () => {
    setPlate([]);
    sound.playRemove();
  };

  const handleServe = () => {
    if (plate.length === 0) return;

    let matchedRecipe: Recipe | null = null;
    const plateIds = plate.map(p => p.ingredient.id);

    for (const r of RECIPES) {
      const allIncluded = r.ingredientIds.every(id => plateIds.includes(id));
      if (allIncluded && !stats.discoveredRecipes.includes(r.id)) {
        matchedRecipe = r;
        break;
      }
    }

    const reward = calculateReward(
      currentOrder,
      validation,
      stats.currentStreak,
      remainingSeconds,
      matchedRecipe ? matchedRecipe.bonus : 0
    );

    setLastReward(reward);
    setDiscoveredRecipe(matchedRecipe);
    setLastFact(getRandomFactForIngredients(plateIds));

    const isSuccess = validation.isReady && !validation.hasHardViolation;

    if (isSuccess) {
      sound.playServe();
      const nextStreak = stats.currentStreak + 1;
      const nextOrdersServed = stats.ordersServed + 1;
      const shouldLevelUp = stats.level < 5 && nextOrdersServed % ordersNeeded === 0;
      const nextLevelValue = shouldLevelUp ? stats.level + 1 : stats.level;

      setDidLevelUp(shouldLevelUp);
      setNewLevel(nextLevelValue);

      const newlyDiscovered = [...stats.discoveredIngredients];
      for (const p of plate) {
        if (!newlyDiscovered.includes(p.ingredient.id)) {
          newlyDiscovered.push(p.ingredient.id);
        }
      }

      const nextRecipes = matchedRecipe
        ? [...stats.discoveredRecipes, matchedRecipe.id]
        : stats.discoveredRecipes;

      setStats(prev => {
        const next = {
          ...prev,
          money: prev.money + reward.total,
          ordersServed: nextOrdersServed,
          currentStreak: nextStreak,
          bestStreak: Math.max(prev.bestStreak, nextStreak),
          level: nextLevelValue,
          discoveredIngredients: newlyDiscovered,
          discoveredRecipes: nextRecipes,
        };
        savePlayerStats(next);
        return next;
      });
    } else {
      sound.playFailure();
      setDidLevelUp(false);
    setStats(prev => {
        const next = {
          ...prev,
          ordersFailed: prev.ordersFailed + 1,
          currentStreak: 0,
        };
        savePlayerStats(next);
        return next;
    });
    }

    setIsExpired(false);
    setIsResultOpen(true);
  };

  const handleNextOrder = () => {
    setIsResultOpen(false);
    setPlate([]);
    setDiscoveredRecipe(null);
    setDidLevelUp(false);

    const nextIndex = orderCount + 1;
    setOrderCount(nextIndex);

    const currentPool = INGREDIENTS.filter(i => i.unlockedAtLevel <= stats.level);
    const nextOrder = generateOrder(stats.level, currentPool, nextIndex);
    setCurrentOrder(nextOrder);
    setRemainingSeconds(nextOrder.timeLimitSec);
  };

  const handleRetryOrder = () => {
    setIsResultOpen(false);
    setPlate([]);
    setRemainingSeconds(currentOrder.timeLimitSec);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleChangeMode = (newMode: GameMode) => {
    setMode(newMode);
    setPlate([]);
    const nextIndex = orderCount + 1;
    setOrderCount(nextIndex);

    const targetLevel = newMode === 'rush_hour' ? 5 : newMode === 'daily' ? 3 : stats.level;
    const currentPool = INGREDIENTS.filter(i => i.unlockedAtLevel <= targetLevel);
    const nextOrder = generateOrder(targetLevel, currentPool, nextIndex);
    setCurrentOrder(nextOrder);
    setRemainingSeconds(nextOrder.timeLimitSec);
  };

  const handleResetCareer = () => {
    const initial = { ...INITIAL_STATS };
    setStats(initial);
    savePlayerStats(initial);
    sound.playAdd();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'COOKING') return;
      if (e.code === 'Space' && !isResultOpen && !isNotebookOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXT AREA') {
          e.preventDefault();
          if (plate.length > 0) {
            handleServe();
          }
        }
      } else if (e.code === 'Escape') {
        if (isNotebookOpen) setIsNotebookOpen(false);
        if (isResultOpen) handleNextOrder();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (gameState === 'TITLE') {
    return (
      <StartScreen
        stats={stats}
        onStartCooking={() => {
          setGameState('COOKING');
          setPlate([]);
          setRemainingSeconds(currentOrder.timeLimitSec);
        }}
        onResetStats={handleResetCareer}
      />
    );
  }

  return (
    <div className="h-screen w-screen bg-[#100E17] text-[#EDE7DC] font-mono selection:bg-[#EAB308] selection:text-[#181614] p-1.5 sm:p-2 flex flex-col justify-between overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-1.5 flex-1 justify-between">
        <Header
          money={stats.money}
          level={stats.level}
          timeOfDay={timeOfDay}
          mode={mode}
          isMuted={isMuted}
          discoveredCount={stats.discoveredIngredients.length}
          totalIngredients={INGREDIENTS.length}
          isCompendiumOpen={isCompendiumVisible}
          onToggleMute={handleToggleMute}
          onOpenNotebook={() => setIsNotebookOpen(true)}
          onToggleCompendium={() => setIsCompendiumVisible(prev => !prev)}
          onChangeMode={handleChangeMode}
          onExitToMenu={() => setGameState('TITLE')}
        />

        <div className="w-full bg-[#181524] border-3 border-[#0B0910] rounded-xs shadow-2xl relative overflow-hidden flex flex-col">
          <div className="w-full relative flex flex-col">
            <div className="w-full grid grid-cols-12 gap-1.5 p-1.5 sm:p-2 items-end relative z-10">
              <div className="col-span-12 lg:col-span-3 flex flex-col justify-end">
                <OrderTicket
                  order={currentOrder}
                  validation={validation}
                  remainingSeconds={remainingSeconds}
                />
              </div>

              <div className="col-span-12 lg:col-span-6 flex flex-col gap-1.5">
                <div className="w-full bg-[#29221B] border-3 border-[#1A1510] p-1.5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  <div className="relative z-10 flex items-center justify-between pb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-4 bg-[#B91C1C] border border-[#520B0B]" />
                      <div className="w-3.5 h-5 bg-[#D97706] border border-[#78350F]" />
                      <div className="w-4 h-4 bg-[#15803D] border border-[#052E16]" />
                      <div className="w-3.5 h-5 bg-[#D49B55] border border-[#78350F]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#1F1C18] border-2 border-[#524B42] flex items-center justify-center">
                        <div className="w-1 h-2 bg-[#423C35]" />
                      </div>
                      <div className="w-0.5 h-4 bg-[#524B42]" />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-2 bg-[#423C35]" />
                      <div className="w-7 h-3 bg-[#B91C1C] rounded-t-full border border-[#520B0B] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FEF08A]" />
                      </div>
                    </div>
                  </div>

                  <PlateView
                    plate={plate}
                    validation={validation}
                    onRemoveItem={handleRemoveItem}
                    onClearPlate={handleClearPlate}
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-3 flex flex-col justify-end gap-1.5">
                <RightActionPanel
                  ordersServedInLevel={ordersServedInLevel}
                  ordersNeeded={ordersNeeded}
                  validation={validation}
                  plateLength={plate.length}
                  onServe={handleServe}
                />

                <div className="hidden lg:flex justify-end pr-2">
                  <div className="bg-[#1C1A17] border-2 border-[#38332C] px-2 py-0.5 text-[8px] text-[#A89C8D] font-bold text-center">
                    GOOD FOOD<br />BRIGHTER DAYS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2 items-start">
          <div className={isCompendiumVisible ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <IngredientSelector
              ingredients={INGREDIENTS}
              unlockedIngredientIds={stats.discoveredIngredients}
              plate={plate}
              currentLevel={stats.level}
              isCompendiumOpen={isCompendiumVisible}
              onToggleCompendium={() => setIsCompendiumVisible(true)}
              onSelectIngredient={handleSelectIngredient}
            />
          </div>

          {isCompendiumVisible && (
            <div className="lg:col-span-5">
              <CompendiumBoard
                ingredients={INGREDIENTS}
                unlockedIngredientIds={stats.discoveredIngredients}
                recipes={RECIPES}
                discoveredRecipeIds={stats.discoveredRecipes}
                onClose={() => setIsCompendiumVisible(false)}
              />
            </div>
          )}
        </div>
      </div>

      <ResultModal
        isOpen={isResultOpen}
        isExpired={isExpired}
        order={currentOrder}
        validation={validation}
        reward={lastReward}
        streak={stats.currentStreak}
        educationalFact={lastFact}
        discoveredRecipe={discoveredRecipe}
        didLevelUp={didLevelUp}
        newLevel={newLevel}
        onNextOrder={handleNextOrder}
        onRetryOrder={handleRetryOrder}
      />

      <FoodNotebookModal
        isOpen={isNotebookOpen}
        ingredients={INGREDIENTS}
        unlockedIngredientIds={stats.discoveredIngredients}
        recipes={RECIPES}
        discoveredRecipeIds={stats.discoveredRecipes}
        onClose={() => setIsNotebookOpen(false)}
      />
    </div>
  );
}

      