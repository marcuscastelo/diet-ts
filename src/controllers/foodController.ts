import { Result } from "surrealdb.js";
import { FoodData } from "../model/foodModel";
import { getFirst, unwrap } from "../utils/result";
import { getFoodById, listFoods as tbcaListFoods } from "~/tbca/tbca";

export const listFoods = async () => tbcaListFoods();

export const getFood = async (id: string) => getFoodById(id);

export const searchFoods = async (name: string) => {
    const foods = await listFoods();
    // If name is an exact match, put it at the top of the list
    const exactMatches = foods.filter(food => food.name === name);

    // If there is a exact match in the list of words, put it at the top of the list as well
    const words = name.toLowerCase().split(" ");
    const wordMatches = foods.filter(food => {
        if (!food.name) return false;
        const foodWords = food.name.toLowerCase().split(" ");
        return words.some(word => foodWords.includes(word));
    });
    return [...exactMatches, ...wordMatches, ...foods];
};

// export const createFood = async (food: Food) =>
//     (await initDB()).query<Result<Food>[]>(`insert into food values ${food}`)
//         .then(getFirst).then(unwrap);