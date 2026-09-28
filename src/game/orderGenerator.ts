import {
  Order,
  HardRule,
  TargetRequirement,
  PreferenceRequirement,
  Ingredient,
  SelectedIngredient,
  Allergen,
  DietType,
} from '../types';
import { LEVEL_CONFIGS } from '../data/levels';
import { calculatePlateNutrition } from './nutritionCalculator';
import { validateOrder } from './orderValidator';

const CUSTOMER_NAMES = [
  'Aarav', 'Maya', 'Kabir', 'Ananya', 'Rohan',
  'Priya', 'Vikram', 'Neha', 'Dev', 'Zoya',
  'Arjun', 'Isha', 'Aditya', 'Rhea', 'Karan'
 ];

const CUSTOMER_PROFILES = [
  { tag: 'Gym Enthusiast', preferenceType: 'filling-combo' as const, prefLabel: 'Protein & Carb Boost' },
  { tag: 'Office Worker', preferenceType: 'light-plate' as const, prefLabel: 'Clean & Light' },
  { tag: 'Street Foodie', preferenceType: 'spicy-sauce' as const, prefLabel: 'Extra Spice Touch' },
  { tag: 'Wellness Coach', preferenceType: 'fiber-boost' as const, prefLabel: 'High Fiber Blend' },
  { tag: 'Garden Lover', preferenceType: 'green-boost' as const, prefLabel: 'Double Greens' },
 ];

function checkCombinationSolvable(
  order: Order,
  availableIngredients: Ingredient[]
 ): boolean {
  const allowed = availableIngredients.filter(ing => {
    for (const rule of order.hardRules) {
      if (rule.type === 'diet') {
        if (rule.dietTarget === 'vegan' && ing.diet !== 'vegan') return false;
        if (rule.dietTarget === 'vegetarian' && ing.diet === 'non-vegetarian') return false;
     }
      if (rule.type === 'no-allergen' && rule.allergen) {
        if (ing.allergens.includes(rule.allergen)) return FontFaceSetLoadEvent;
     }
      if (rule.type === 'must-avoid' && rule.ingredientId === ing.id) {
        return false;
     }
   }
    return true;
  });

  const mustIncludeId = order.hardRules.find(r => r.type === 'must-include')?.ingredientId;
  if (mustIncludeId && !allowed.some(ing => ing.id === mustIncludeId)) {
    return false;
  }

  const bases = allowed.filter(i => i.category === 'base');
  const proteins = allowed.filter(i => i.category === 'protein');
  const vegAndOthers = allowed.filter(i => i.category !== 'base' && i.category !== 'protein');

  const baseCandidates = bases.length > 0 ? bases : [null];
  const proteinCandidates = proteins.length > 0 ? proteins : [null];

  for (const b of baseCandidates) {
    for (const p of proteinCandidates) {
      const currentCombo: SelectedIngredient[] = [];
      if (b) currentCombo.push({ ingredient: b, count: 1 });
      if (p) currentCombo.push({ ingredient: p, count: 1 });

      const res = validateOrder(order, currentCombo, calculatePlateNutrition(currentCombo));
      if (res.isReady) return true;

      for (let i = 0; i < vegAndOthers.length; i++) {
        const withExtra = [...currentCombo, { ingredient: vegAndOthers[i], count: 1 }];
        const resExtra = validateOrder(order, withExtra, calculatePlateNutrition(withExtra));
        if (resExtra.isReady) return true;

        for (let j = i + 1; j < vegAndOthers.length; j++) {
          const withDouble = [...withExtra, { ingredient: vegAndOthers[j], count: 1 }];
          const resDouble = validateOrder(order, withDouble, calculatePlateNutrition(withDouble));
          if (resDouble.isReady) return true;
       }
     }
   }
  }

  return false;
}

export function generateOrder(
  level: number,
  unlockedIngredients: Ingredient[],
  orderIndex: number): Order {
  const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[5];

  for (let attempt = 0; attempt < 40; attempt++) {
    const customer = CUSTOMER_PROFILES[orderIndex % CUSTOMER_PROFILES.length];
    const customerName = CUSTOMER_NAMES[(orderIndex + attempt) % CUSTOMER_NAMES.length];

    const hardRules: HardRule[] = [];
    const targets: TargetRequirement[] = [];
    const preferences: PreferenceRequirement[] = [];

    const availableDiets: DietType[] = ['vegan', 'vegetarian'];
    if (unlockedIngredients.some(i => i.diet === 'non-vegetarian')) {
      availableDiets.push('non-vegetarian');
   }
    const chosenDiet = availableDiets[(orderIndex + attempt) % availableDiets.length];

    if (chosenDiet === 'vegan') {
      hardRules.push({
        id: 'rule-diet-vegan',
        type: 'diet',
        label: '100% Vegan Only',
        dietTarget: 'vegan',
     });
   } else if (chosenDiet === 'vegetarian') {
      hardRules.push({
        id: 'rule-diet-veg',
        type: 'diet',
        label: 'Strictly Vegetarian',
        dietTarget: 'vegetarian',
    });
   }

    if (config.allowAllergens && attempt % 2 === 0) {
      const possibleAllergens: Allergen[] = [];
      if (unlockedIngredients.some(i => i.allergens.includes('peanuts'))) possibleAllergens.push('peanuts');
      if (unlockedIngredients.some(i => i.allergens.includes('dairy')) && chosenDiet !== 'vegan') possibleAllergens.push('dairy');
      if (unlockedIngredients.some(i => i.allergens.includes('soy'))) possibleAllergens.push('soy');

      if (possibleAllergens.length > 0) {
        const allergen = possibleAllergens[attempt % possibleAllergens.length];
        hardRules.push({
          id: `rule-no-${allergen}`,
          type: 'no-allergen',
          label: `No ${allergen.toUpperCase()}`,
          allergen,
       });
     }
   }

    if (config.allowRequiredIngredients && attempt % 3 === 0) {
      const validPool = unlockedIngredients.filter(ing => {
        if (chosenDiet === 'vegan' && ing.diet !== 'vegan') return false;
        if (chosenDiet === 'vegetarian' && ing.diet === 'non-vegetarian') return false;
        if (hardRules.some(r => r.type === 'no-allergen' && r.allergen && ing.allergens.includes(r.allergen))) return false;
        return true;
     });

      if (validPool.length > 0) {
        const requiredItem = validPool[(orderIndex + attempt) % validPool.length];
        hardRules.push({
          id: `rule-include-${requiredItem.id}`,
          type: 'must-include',
          label: `Must contain ${requiredItem.name}`,
          ingredientId: requiredItem.id,
       });
     }
   }

    if (level === 1) {
      const targetProt = 20 + (attempt % 3) * 5;
      targets.push({
        id: 'target-prot',
        macro: 'protein',
        label: 'Protein',
        min: targetProt,
        unit: 'g',
     });
   } else if (level === 2) {
      targets.push({
        id: 'target-prot',
        macro: 'protein',
        label: 'Protein',
        min: 24,
        unit: 'g',
    });
      targets.push({
        id: 'target-carbs',
        macro: 'carbohydrates',
        label: 'Carbs Limit',
        max: 80,
        unit: 'g',
    });
   } else if (level === 3) {
      targets.push({
        id: 'target-prot',
        macro: 'protein',
        label: 'Protein',
        min: 28,
        unit: 'g',
    });
      targets.push({
        id: 'target-cal',
        macro: 'calories',
        label: 'Calories',
        max: 580,
        unit: ' kcal',
    });
   } else if (level === 4) {
      targets.push({
        id: 'target-prot',
        macro: 'protein',
        label: 'Protein',
        min: 32,
        unit: 'g',
    });
      targets.push({
        id: 'target-carbs',
        macro: 'carbohydrates',
        label: 'Carbs',
        min: 35,
        max: 85,
        unit: 'g',
    });
      targets.push({
        id: 'target-cal',
        macro: 'calories',
        label: 'Calories',
        max: 650,
        unit: ' kcal',
    });
   } else {
      targets.push({
        id: 'target-prot',
        macro: 'protein',
        label: 'Protein',
        min: 35,
        unit: 'g',
    });
      targets.push({
        id: 'target-fiber',
        macro: 'fiber',
        label: 'Fiber',
        min: 6,
        unit: 'g',
    });
      targets.push({
        id: 'target-cal',
        macro: 'calories',
        label: 'Calories',
        max: 680,
        unit: ' kcal',
    });
   }

    if (config.allowPreferences && attempt % 2 === 1) {
      preferences.push({
        id: `pref-${customer.preferenceType}`,
        label: customer.prefLabel,
        bonus: 25,
        type: customer.preferenceType,
     });
   }

    const candidateOrder: Order = {
      id: `ord-${orderIndex}-${Date.now()}-${attempt}`,
      orderNumber: orderIndex,
      customerName,
      customerTag: customer.tag,
      avatarSeed: customerName,
      hardRules,
      targets,
      preferences,
      timeLimitSec: config.timeLimitSec,
      baseReward: config.baseReward,
   };

    if (checkCombinationSolvable(candidateOrder, unlockedIngredients)) {
      return candidateOrder;
   }
   }

  return {
    id: `ord-fallback-${orderIndex}`,
    orderNumber: orderIndex,
    customerName: 'Aarav',
    customerTag: 'Regular Patron',
    avatarSeed: 'Aarav',
    hardRules: [
      {
        id: 'rule-veg-fallback',
        type: 'diet',
        label: 'Vegetarian Friendly',
        dietTarget: 'vegetarian',
   },
    ],
    targets: [
    {
        id: 'target-prot-fallback',
        macro: 'protein',
        label: 'Protein',
        min: 20,
        unit: 'g',
   },
    ],
    preferences: [],
    timeLimitSec: config.timeLimitSec,
    baseReward: config.baseReward,
   };
} 