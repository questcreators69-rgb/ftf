import { Nutrition, SelectedIngredient } from '../types';

export function calculatePlateNutrition(items: SelectedIngredient[]): Nutrition {
  const totals: Nutrition = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
  };

  for (const item of items) {
    const mult = item.count;
    totals.calories += item.ingredient.nutrition.calories * mult;
    totals.protein += item.ingredient.nutrition.protein * mult;
    totals.carbohydrates += item.ingredient.nutrition.carbohydrates * mult;
    totals.fat += item.ingredient.nutrition.fat * mult;
    totals.fiber += item.ingredient.nutrition.fiber * mult;
  }

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein * 10) / 10,
    carbohydrates: Math.round(totals.carbohydrates * 10) / 10,
    fat: Math.round(totals.fat * 10) / 10,
    fiber: Math.round(totals.fiber * 10) / 10,
  };
}