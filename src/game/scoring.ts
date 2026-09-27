import { Order, OrderValidationResult, RewardBreakdown } from '../types';

export function calculateReward(
  order: Order,
  validation: OrderValidationResult,
  streak: number,
  remainingSeconds: number,
  recipeBonus: number = 0
): RewardBreakdown {
  if (!validation.isReady || validation.hasHardViolation) {
    return {
      base: 0,
      perfectBonus: 0,
      streakBonus: 0,
      speedBonus: 0,
      preferenceBonus: 0,
      total: 0,
    };
  }

  const base = order.baseReward;
  const isPerfect = validation.satisfaction === 'Perfect';
  const perfectBonus = isPerfect ? 35 : 0;
  const streakBonus = Math.min(streak * 15, 90);

  let speedBonus = 0;
  const ratio = remainingSeconds / order.timeLimitSec;
  if (ratio > 0.5) {
    speedBonus = 25;
  } else if (ratio > 0.25) {
    speedBonus = 15;
  }

  const preferenceBonus = validation.satisfiedPreferences.length * 20 + recipeBonus;
  const total = base + perfectBonus + streakBonus + speedBonus + preferenceBonus;

  return {
    base,
    perfectBonus,
    streakBonus,
    speedBonus,
    preferenceBonus,
    total,
  };
}