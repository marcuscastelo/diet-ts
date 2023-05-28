import { MacroNutrientsData } from "./macroNutrientsModel";

export type FoodData = {
    id: string;
    name: string;
    macros: MacroNutrientsData;
}