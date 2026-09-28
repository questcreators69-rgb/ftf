import {
  Order,
  SelectedIngredient,
OrderValidationResult,
  HardRuleStatus,
  TargetStatus,
  SatisfactionLevel,
  Nutrition,
} from '../types';

export function validateOrder(
  order: Order,
  plate: SelectedIngredient[],
  nutrition: Nutrition): OrderValidationResult {
  const hardStatuses: HardRuleStatus[] = [];
  let hasHardViolation = false;
  const whyExplanation: string[] = [];

  for (const rule of order.hardRules) {
    if (rule.type === 'diet') {
      if (rule.dietTarget === 'vegan') {
        const nonVeganItem = plate.find(
          item => item.ingredient.diet !== 'vegan'
        );
        if (nonVeganItem) {
          hasHardViolation = true;
          hardStatuses.push({
            rule,
            isSatisfied: false,
            isViolated: true,
            violationMessage: `${nonVeganItem.ingredient.name} is not vegan.`,
          });
        } else {
          const isSatisfied = plate.length > 0;
        hardStatuses.push({
            rule,
            isSatisfied,
            isViolated: false,
        });
          if (isSatisfied) whyExplanation.push('All selected ingredients are 100% vegan.');
        }
      } else if (rule.dietTarget === 'vegetarian') {
        const nonVegItem = plate.find(
          item => item.ingredient.diet === 'non-vegetarian'
        );
        if (nonVegItem) {
          hasHardViolation = true;
          hardStatuses.push({
            rule,
            isSatisfied: false,
            isViolated: true,
            violationMessage: `${nonVegItem.ingredient.name} contains meat/fish.`,
          });
        } else {
          const isSatisfied = plate.length > 0;
          hardStatuses.push({
            rule,
            isSatisfied,
            isViolated: false,
          });
          if (isSatisfied) whyExplanation.push('All ingredients are strictly vegetarian.');
        }
      }
    } else if (rule.type === 'no-allergen' && rule.allergen) {
      const allergicItem = plate.find(item =>
        item.ingredient.allergens.includes(rule.allergen!)
      );
      if (allergicItem) {
        hasHardViolation = true;
        hardStatuses.push({
          rule,
          isSatisfied: false,
          isViolated: true,
          violationMessage: `${allergicItem.ingredient.name} contains ${rule.allergen}.`,
        });
      } else {
        hardStatuses.push({
          rule,
          isSatisfied: true,
          isViolated: false,
        });
        whyExplanation.push(`Clean from ${rule.allergen} allergen.`);
      }
    } else if (rule.type === 'must-include' && rule.ingredientId) {
      const hasItem = plate.some(
        item => item.ingredient.id === rule.ingredientId      );
      hardStatuses.push({
        rule,
        isSatisfied: hasItem,
        isViolated: false,
      });
      if (hasItem) {
        const found = plate.find(item => item.ingredient.id === rule.ingredientId);
        whyExplanation.push(`Included required ${found?.ingredient.name}.`);
      }
    } else if (rule.type === 'must-avoid' && rule.ingredientId) {
      const hasItem = plate.some(
        item => item.ingredient.id === rule.ingredientId      );
      if (hasItem) {
        hasHardViolation = true;
        hardStatuses.push({
          rule,
          isSatisfied: false,
          isViolated: true,
          violationMessage: 'Contains an ingredient explicitly forbidden.',
        });
      } else {
        hardStatuses.push({
          rule,
          isSatisfied: true,
          isViolated: false,
        });
      }
    }
  }

  const targetStatuses: TargetStatus[] = [];
  let allTargetsMet = true;

  for (const target of order.targets) {
    const val = nutrition[target.macro];
    let isMet = true;

    if (target.min !== undefined && val < target.min) {
      isMet = false;
    }
    if (target.max !== undefined && val > target.max) {
      isMet = false;
    }

    if (!isMet) {
      allTargetsMet = false;
    } else if (plate.length > 0) {
      const contributors = plate        .filter(p => p.ingredient.nutrition[target.macro] > 0)
        .map(p => `${p.ingredient.name} (${p.ingredient.nutrition[target.macro] * p.count}${target.unit})`)
        .join(' + ');
      if (contributors) {
        whyExplanation.push(`${target.label}: reached ${val}${target.unit} with ${contributors}.`);
      }
    }

    targetStatuses.push({
      id: target.id,
      macro: target.macro,
      label: target.label,
      current: val,
      min: target.min,
      max: target.max,
      unit: target.unit,
      isMet,
     });
   }

  const satisfiedPreferences: string[] = [];
  for (const pref of order.preferences) {
    let met = false;
    if (pref.type === 'fiber-boost') {
      met = nutrition.fiber >= 7;
     } else if (pref.type === 'spicy-sauce') {
      met = plate.some(
        p => p.ingredient.id === 'smoky-chili' || p.ingredient.id === 'peanut-satay'
       );
      } else if (pref.type === 'light-plate') {
      met = nutrition.calories <= 480 && nutrition.calories >= 250;
       } else if (pref.type === 'filling-combo') {
      met = nutrition.carbohydrates >= 45 && nutrition.protein >= 24;
        } else if (pref.type === 'green-boost') {
      const vegCount = plate.filter(p => p.ingredient.category === 'vegetable').length;
      met = vegCount >= 2;
         }
    if (met) {
      satisfiedPreferences.push(pref.label);
     }
   }

  const allHardRulesSatisfied = hardStatuses.every(s => s.isSatisfied && !s.isViolated);
  const isReady = plate.length > 0 && !hasHardViolation && allHardRulesSatisfied && allTargetsMet;
  const canServe = plate.length > 0;

  let satisfaction: SatisfactionLevel = 'Good';
  let failureReason: string | undefined = undefined;

  if (hasHardViolation) {
    satisfaction = 'Failed';
    const violation = hardStatuses.find(s => s.isViolated);
    failureReason = violation?.violationMessage || 'Hard rule constraint was breached.';
   } else if (!allHardRulesSatisfied || !allTargetsMet) {
    satisfaction = 'Failed';
    const missedTarget = targetStatuses.find(t => !t.isMet);
    const missedHard = hardStatuses.find(h => !h.isSatisfied);

    if (missedHard) {
      failureReason = `Missing requirement: ${missedHard.rule.label}`;
     } else if (missedTarget) {
      if (missedTarget.min !== undefined && missedTarget.current < missedTarget.min) {
        failureReason = `${missedTarget.label} target not reached (${missedTarget.current}${missedTarget.unit} / min ${missedTarget.min}${missedTarget.unit}).`;
       } else if (missedTarget.max !== undefined && missedTarget.current > missedTarget.max) {
        failureReason = `${missedTarget.label} exceeded limit (${missedTarget.current}${missedTarget.unit} / max ${missedTarget.max}${missedTarget.unit}).`;
        }
      }
    } else {
    if (order.preferences.length > 0 && satisfiedPreferences.length === order.preferences.length) {
      satisfaction = 'Perfect';
     } else if (order.preferences.length > 0 && satisfiedPreferences.length > 0) {
      satisfaction = 'Great';
      } else if (order.preferences.length === 0) {
      satisfaction = 'Perfect';
       } else {
      satisfaction = 'Good';
        }
     }

  return {
    isReady,
    canServe,
    hasHardViolation,
    hardRuleStatuses: hardStatuses,
    targetStatuses,
    satisfiedPreferences,
    satisfaction,
    failureReason,
    whyExplanation,
   };
   } 