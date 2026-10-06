import { Recipe } from '../types';

export const RECIPES: Recipe[] =[
  {
    id: 'palak-paneer-thali',
    name: 'Palak Paneer Platter',
    description: 'Fresh paneer folded into garlic spinach, stoneground roti, and tomato masala.',
    ingredientIds: ['whole-wheat-roti', 'fresh-paneer', 'sauteed-spinach', 'tomato-masala'],
    bonus: 35,
  },
  {
    id: 'mediterranean-power-bowl',
    name: 'Mediterranean Super Bowl',
    description: 'Quinoa base with roasted chickpeas, sliced avocado, and velvety tahini hummus.',
    ingredientIds: ['quinoa-bowl', 'roasted-chickpeas', 'sliced-avocado', 'creamy-hummus'],
    bonus: 40,
  },
  {
    id: 'tandoori-protein-box',
    name: 'Tandoori Protein Box',
    description: 'Smoky grilled chicken with fragrant basmati rice, charred peppers, and cooling raita.',
    ingredientIds: ['basmati-rice', 'grilled-chicken', 'charred-peppers', 'mint-yogurt'],
    bonus: 45,
  },
  {
    id: 'green-tofu-stirfry',
    name: 'Green Vegan Harmony',
    description: 'Braised firm tofu with steamed broccoli, fire roasted tomatoes, and crunchy toasted seeds.',
    ingredientIds: ['firm-tofu', 'steamed-broccoli', 'roasted-tomatoes', 'toasted-seeds'],
    bonus: 35,
  },
  {
    id: 'spicy-satay-noodles',
    name: 'Spicy Peanut Wok',
    description: 'Wok tossed noodles with seared fish or tofu, crisp bell peppers, and rich peanut satay.',
    ingredientIds: ['hakka-noodles', 'charred-peppers', 'peanut-satay', 'crushed-peanuts'],
    bonus: 50,
  },
  {
    id: 'delhi-street-wrap',
    name: 'Delhi Street Roll',
    description: 'Multigrain wrap packed with spiced chickpeas, sweet corn, and crisp herb drizzle.',
    ingredientIds: ['multigrain-wrap', 'roasted-chickpeas', 'sweet-corn', 'fresh-herbs'],
    bonus: 35,
  }
];