import { EducationalFact } from '../types';

export const EDUCATIONAL_FACTS: EducationalFact[] = [
  {
    id: 'fact-chickpeas',
    ingredientId: 'roasted-chickpeas',
    text: 'chickpeas are a double power-house: they provide both plant protein and complex, slow-digesting dietary fiber.',
  },
  {
    id: 'fact-paneer',
    ingredientId: 'fresh-paneer',
    text: 'fresh paneer is rich in slow-digesting casein protein, which sustains satiety, along with dietary calcium.',
  },
  {
    id: 'fact-tofu',
    ingredientId: 'firm-tofu',
    text: 'firm tofu contains all 9 essential amino acids, making it one of the few complete plant-based proteins.',
  },
  {
    id: 'fact-chicken',
    ingredientId: 'grilled-chicken',
    text: 'skinless chicken breast delivers high-density protein with almost negligible carbohydrates.',
  },
  {
    id: 'fact-eggs',
    ingredientId: 'boiled-eggs',
    text: 'egg whites contain concentrated albumin protein, while the yolk delivers essential fat-soluble vitamins.',
  },
  {
    id: 'fact-spinach',
    ingredientId: 'sauteed-spinach',
    text: 'dark leafy spinach offers iron, folate, and lutein at only 35 calories per serving.',
  },
  {
    id: 'fact-avocado',
    ingredientId: 'sliced-avocado',
    text: 'avocados are rich in heart-healthy monounsaturated oleic acid and soluble fiber rather than saturated fats.',
  },
  {
    id: 'fact-quinoa',
    ingredientId: 'quinoa-bowl',
    text: 'unlike refined grains, whole-grain quinoa has a low glycemic index and provides steady energy.',
  },
  {
    id: 'fact-broccoli',
    ingredientId: 'steamed-broccoli',
    text: 'broccoli florets provide glucosinolates and more than 100% of daily vitamin c needs in 100 grams.',
  },
  {
    id: 'fact-peanuts',
    ingredientId: 'crushed-peanuts',
    text: 'peanuts are botanically legumes that pack substantial protein, vitamin e, and niacin.',
  },
  {
    id: 'fact-fish',
    ingredientId: 'seared-fish',
    text: 'white fish offers clean, lean protein with rapid digestion and minimal saturated fat.',
  }
];

export function getRandomFactForIngredients(ingredientids: string[]): string {
  const matching = EDUCATIONAL_FACTS.filter(f => ingredientids.includes(f.ingredientId));
  if (matching.length > 0) {
    const pick = matching[Math.floor(Math.random() * matching.length)];
    return pick.text;
  }
  const fallback = EDUCATIONAL_FACTS[Math.floor(Math.random() * EDUCATIONAL_FACTS.length)];
  return fallback.text;
}