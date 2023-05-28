import { FoodData } from "./foodModel";
import { MacroNutrientsData } from "./macroNutrientsModel";

export type MealItemData = {
    mealId: string;
    id: string;
    food: FoodData;
    quantity: number;
};