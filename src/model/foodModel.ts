import { MacroNutrientsData } from "./macroNutrientsModel";

type ExtraFoodData = {
    humidity: number;
    totalCarbs: number;
    availableCarbs: number;
    protein: number;
    fat: number;
    fiber: number;
    alcohol: number;
    ash: number;
    colesterol: number;
    saturatedFat: number;
    monounsaturatedFat: number;
    polyunsaturatedFat: number;
    transFat: number;
    calcium: number;
    iron: number;
    sodium: number;
    magnesium: number;
    phosphorus: number;
    potassium: number;
    zinc: number;
    copper: number;
    selenium: number;
    vitaminARE: number;
    vitaminARAE: number;
    vitaminD: number;
    vitaminE: number;
    thiamine: number;
    riboflavin: number;
    niacin: number;
    vitaminB6: number;
    vitaminB12: number;
    vitaminC: number;
    folate: number;
    addedSalt: number;
    addedSugar: number;
}

export type FoodData = ExtraFoodData & {
    id: string;
    name: string;
    macros: MacroNutrientsData;
    
}