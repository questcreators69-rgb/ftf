export type DietType = 'vegan' | 'vegetarian' | 'non-vegetarian';

export type Allergen = 'dairy' | 'peanuts' | 'eggs' | 'soy' | 'nuts' | 'gluten';
export type IngredientCategory = 'base' | 'protein' | 'vegetable' | 'topping' | 'sauce';

export interface Nutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  servingGrams: number;
  nutrition: Nutrition;
  diet: DietType;
  allergens: Allergen[];
  tint: string;
  badge: string;
  flavorProfile?: string;
  unlockedAtLevel: number;
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  count: number;
}
export type HardRuleType = 'diet' | 'no-allergen' | 'must-include' | 'must-avoid';

export interface HardRule {
  id: string;
  type: HardRuleType;
  label: string;
  dietTarget?: DietType;
  allergen?: Allergen;
  ingredientId?: string;
}
export interface TargetRequirement {
  id: string;
  macro: keyof Nutrition;
  label: string;
  min?: number;
  max?: number;
  unit: string;
}

export interface PreferenceRequirement {
  id: string;
  label: string;
  bonus: number;
  type: 'fiber-boost' | 'spicy-sauce' | 'light-plate' | 'filling-combo' | 'green-boost';
}

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  customerTag: string;
  avatarSeed: string;
  hardRules: HardRule[];
  targets: TargetRequirement[];
  preferences: PreferenceRequirement[];
  timeLimitSec: number;
  baseReward: number;
}

export type SatisfactionLevel = 'Perfect' | 'Great' | 'Good' | 'Poor' | 'Failed';

export interface TargetStatus {
  id: string;
  macro: keyof Nutrition;
  label: string;
  current: number;
  min?: number;
  max?: number;
  unit: string;
  isMet: boolean;
}

export interface HardRuleStatus {
  rule: HardRule;
  isSatisfied: boolean;
  isViolated: boolean;
  violationMessage?: string;
}

export interface OrderValidationResult {
  isReady: boolean;
  canServe: boolean;
  hasHardViolation: boolean;
  hardRuleStatuses: HardRuleStatus[];
  targetStatuses: TargetStatus[];
  satisfiedPreferences: string[];
  satisfaction: SatisfactionLevel;
failureReason?: string;
  whyExplanation: string[];
}

export interface RewardBreakdown {
  base: number;
  perfectBonus: number;
  streakBonus: number;
  speedBonus: number;
  preferenceBonus: number;
  total: NumberConstructor;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export type TruckTier = 1 | 2 | 3 | 4 | 5;

export interface TruckInfo {
  tier: TruckTier;
  title: string;
  subtitle: string;
  colorTheme: string;
}

export type GameMode = 'career' | 'rush-hour' | 'daily';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredientIds: string[];
  bonus: number;
}

export interface EducationalFact {
  id: string;
  ingredientId: string;
  text: string;
}

export interface PlayerStats {
  money: number;
  level: number;
  ordersServed: NumberConstructor;
  ordersFailed: number;
  currentStreak: number;
  bestStreak: number;
  discoveredIngredients: string[];
  discoveredRecipes: string[];
  dailyCompletedDates: string[];
}