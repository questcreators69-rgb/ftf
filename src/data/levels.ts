import { TruckInfo } from '../types';

export interface LevelConfig {
  level: number;
  name: string;
  tagline: string;
  timeLimitSec: number;
  ordersToAdvance: number;
  unlockedIngredientCount: number;
  macroTargetsCount: number;
  allowAllergens: boolean;
  allowRequiredIngredients: boolean;
  allowPreferences: boolean;
  baseReward: number;
}

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: {
    level: 1,
    name: 'First Day',
    tagline: 'Learn the plate essentials & simple protein targets.',
    timeLimitSec: 40,
    ordersToAdvance: 4,
    unlockedIngredientCount: 8,
    macroTargetsCount: 1,
    allowAllergens: false,
    allowRequiredIngredients: false,
    allowPreferences: false,
    baseReward: 120,
  ,
  2: {
    level: 2,
    name: 'Picky Orders',
    tagline: 'Manage special requests and dual nutrition goals.',
    timeLimitSec: 35,
    ordersToAdvance: 5,
    unlockedIngredientCount: 12,
    macroTargetsCount: 2,
    allowAllergens: false,
    allowRequiredIngredients: true,
    allowPreferences: true,
    baseReward: 150,
  },
  3: {
    level: 3,
    name: 'Food Rules',
    tagline: 'Respect strict allergen barriers and calorie ceilings.',
    timeLimitSec: 30,
    ordersToAdvance: 6,
    unlockedIngredientCount: 16,
    macroTargetsCount: 2,
    allowAllergens: true,
    allowRequiredIngredients: true,
    allowPreferences: true,
    baseReward: 180,
  },
  4: {
    level: 4,
    name: 'Macro Master',
    tagline: 'Fine-tune complex ratios of protein, carbs, and fiber.',
    timeLimitSec: 25,
    ordersToAdvance: 7,
    unlockedIngredientCount: 21,
    macroTargetsCount: 3,
    allowAllergens: true,
    allowRequiredIngredients: true,
    allowPreferences: true,
    baseReward: 220,
  },
  5: {
    level: 5,
    name: 'Food Truck Chaos',
    tagline: 'Rush-hour speed with maximum constraint density.',
    timeLimitSec: 20,
    ordersToAdvance: 8,
    unlockedIngredientCount: 26,
    macroTargetsCount: 3,
    allowAllergens: true,
    allowRequiredIngredients: true,
    allowPreferences: true,
    baseReward: 260,
  },
  };

export const TRUCK_TIERS: Record<number, TruckInfo> = {
  1: {
    tier: 1,
    title: 'The Starter Cart',
    subtitle: 'Modest roadside cart with fresh morning prep',
    colorTheme: 'amber',
  },
  2: {
    tier: 2,
    title: 'Neighborhood Van',
    subtitle: 'Upgraded st ainless service window & awning',
    colorTheme: 'orange',
  },
  3: {
    tier: 3,
    title: 'The Street Favorite',
    subtitle: 'Festoon lighting, dual ticket rails & brisk buzz',
    colorTheme: 'emerald',
  },
  4: {
    tier: 4,
    title: 'Metro Express',
    subtitle: 'Streamlined commercial rig with quick-prep bays',
    colorTheme: 'cyan',
  },
  5: {
    tier: 5,
    title: 'Food Truck Legend',
    subtitle: 'Iconic street food institution with citywide fame',
    colorTheme: 'violet',
  },
};