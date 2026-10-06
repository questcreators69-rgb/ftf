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
    if (ordersServedInLevel <= 3) return ' afternoon';
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