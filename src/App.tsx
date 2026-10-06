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
import { c alculatePlateNutrition } from './game/nutritionCalculator';
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