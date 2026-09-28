import { PlayerStats } from '../types';

const STORAGE_KEY = 'food-truck-formula-stats-v1';

export const INITIAL_STATS: PlayerStats = {
  money: 0,
  level: 1,
  ordersServed: 0,
  ordersFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  discoveredIngredients: [
    'basmati-rice',
    'whole-wheat-roti',
    'fresh-paneer',
    'roasted-chickpeas',
    'sauteed-spinach',
    'roasted-tomatoes',
    'fresh-herbs',
    'tomato-masala',
  ],
  discoveredRecipes: [],
  dailyCompletedDates: [],
};

export function loadPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_STATS };
    const parsed = JSON.parse(raw);
    return {
      money: typeof parsed.money === 'number' ? parsed.money : 0,
      level: typeof parsed.level === 'number' ? Math.min(Math.max(parsed.level, 1), 5) : 1,
      ordersServed: typeof parsed.ordersServed === 'number' ? parsed.ordersServed : 0,
      ordersFailed: typeof parsed.ordersFailed === 'number' ? parsed.ordersFailed : 0,
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      discoveredIngredients: Array.isArray(parsed.discoveredIngredients)
        ? parsed.discoveredIngredients
        : [...INITIAL_STATS.discoveredIngredients],
      discoveredRecipes: Array.isArray(parsed.discoveredRecipes) ? parsed.discoveredRecipes : [],
      dailyCompletedDates: Array.isArray(parsed.dailyCompletedDates) ? parsed.dailyCompletedDates : [],
    };
  } catch {
    return { ...INITIAL_STATS };
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}