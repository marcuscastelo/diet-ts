import { MacroNutrientsProps } from "~/types";

export function emptyMacros(): MacroNutrientsProps {
    return {
        carbs: 0,
        protein: 0,
        fat: 0,
    }
}

export function multiplyMacros(macros: MacroNutrientsProps, quantity: number): MacroNutrientsProps {
    const multiplier = quantity / 100;
    return {
        carbs: macros.carbs * multiplier,
        protein: macros.protein * multiplier,
        fat: macros.fat * multiplier,
    }
}

export function sumMacros([...macros]: MacroNutrientsProps[]): MacroNutrientsProps {
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

export function macroCalories(macros: MacroNutrientsProps): number {
    return macros.carbs * 4 + macros.protein * 4 + macros.fat * 9;
}
