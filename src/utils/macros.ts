import { MacroNutrientsData } from "~/model/macroNutrientsModel";

export function emptyMacros(): MacroNutrientsData {
    return {
        carbs: 0,
        protein: 0,
        fat: 0,
    }
}

export function multiplyMacros(macros: MacroNutrientsData, quantity: number): MacroNutrientsData {
    const multiplier = quantity / 100;
    return {
        carbs: macros.carbs * multiplier,
        protein: macros.protein * multiplier,
        fat: macros.fat * multiplier,
    }
}

export function sumMacros([...macros]: MacroNutrientsData[]): MacroNutrientsData {
    return macros.reduce((acc, curr) => {
        return {
            carbs: acc.carbs + curr.carbs,
            protein: acc.protein + curr.protein,
            fat: acc.fat + curr.fat,
        }
    }, {
        carbs: 0,
        protein: 0,
        fat: 0,
    })
}

export function macroCalories(macros: MacroNutrientsData): number {
    return macros.carbs * 4 + macros.protein * 4 + macros.fat * 9;
}
