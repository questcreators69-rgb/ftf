# Food Truck Formula

"Build the plate. Before it's late."

A nutrition puzzle simulator where you run an authentic street food truck. Satisfy strict dietary guidelines, hit macronutrient target formulas, avoid allergens, and serve hungry patrons before the clock runs out.

## Gameplay Loop

- **Read**: Inspect incoming order tickets for mandatory Hard Rules (Vegan, Vegetarian, No Peanuts, No Dairy, specific required ingredients) and numerical targets (Protein minimums, Carb ranges, Calorie ceilings, Fiber).
- **Build**: Select ingredients from your pantry across five categories: Bases, Proteins, Vegetables, Toppings, and Sauces.
- **Watch**: Live macronutrient gauges update dynamically as ingredients are added on the serving plate.
- **Satisfy**: Meet all restrictions and macro targets until the order transitions to the green **Order Ready** state.
- **Serve**: Plate the order before the shift timer expires to collect fare payouts, speed bonuses, perfect formulation rewards, and streak multipliers.
- **Progress**: Advance through shifts from Morning to Afternoon to Evening, upgrading your truck from a Starter Cart to a Food Truck Legend while unlocking new ingredients and discovering secret thali and bowl combinations in your Food Notebook.

## Core Features

- **Dynamic Order Generation & Solvability**: Every generated customer order is verified against the currently unlocked ingredient pool to guarantee fair, multiple-solution puzzle combinations.
- **Immediate Visual Feedback**: Clear indicators for pending rules, met requirements, and violation warnings if an excluded allergen or diet breaker is added.
- **Shift Atmosphere**: Dynamic time-of-day progression (Morning, Afternoon, Evening) with responsive visual themes and truck tier upgrades.
- **Food Truck Notebook**: Track unlocked pantry ingredients with educational macro profiles and discoverable signature recipes.
- **Audio Feedback**: Procedural Web Audio API sound effects for ingredient selection, removals, timer countdowns, success jingles, and error warnings with complete mute control.
- **Zero External Backend**: Fully client-side standalone architecture using browser APIs and localStorage for streak and progression persistence.

## Development

npm install
npm run dev

## Production Build

npm run build
npm run preview

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- Lucide React
- Vite
