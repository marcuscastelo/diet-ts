import { createServerData$ } from "solid-start/server";
import { FoodData } from "~/model/foodModel";
import * as foodController from '../controllers/foodController';

export default function createServerDataFood$() {
    return createServerData$(async () => {
        const mockMacros = (food: Omit<FoodData, 'macros'>) => ({
            ...food,
            macros: {
                protein: 123,
                carbs: 123,
                fat: 12,
            },
        } as FoodData);
        return (await foodController.listFoods()).map(mockMacros);
    });
}