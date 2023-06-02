import { createServerData$ } from "solid-start/server";
import { FoodData } from "~/model/foodModel";
import * as foodController from '../controllers/foodController';

export default function createServerDataFood$() {
    return createServerData$(async () => {
        const tempFillMacros = (food: Omit<FoodData, 'macros'>) => ({
            ...food,
            macros: {
                protein: parseFloat(food['Proteína']?.[0].replace(',', '.')) || 0,
                carbs: parseFloat(food['Carboidrato total']?.[0].replace(',', '.')) || 0,
                fat: parseFloat(food['Lipídios']?.[0].replace(',', '.')) || 0,
            },
        } as FoodData);
        return (await foodController.listFoods()).map(tempFillMacros);
    });
}