import { MacroNutrientsData } from "./macroNutrientsModel";

export type MealItemData = {
    mealId: string;
    id: string;
    name: string;
    macros: MacroNutrientsData;
};