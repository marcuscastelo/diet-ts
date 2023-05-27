import { Result } from "surrealdb.js";
import { Food } from "../model/foodModel";
import { getFirst, unwrap } from "../utils/result";
import { initDB } from "~/utils/surreal_db";

export const listFoods = async () =>
    (await initDB()).query<Result<Food[]>[]>(
        `select * from food`
    ).then(getFirst).then(unwrap);

export const getFood = async (id: string) =>
    (await initDB()).query<Result<Food>[]>(`select * from food::${id}`)
        .then(getFirst).then(unwrap);

export const searchFoods = async (name: string) =>
    (await initDB()).query<Result<Food[]>[]>(
        `select *, string::len(name) as length, array::len(string::words(name)) as wordCount from food where name ~ '${name}' order by length asc, id asc, wordCount asc` 
    ).then(getFirst).then(unwrap).then(foods => {
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
    });

// export const createFood = async (food: Food) =>
//     (await initDB()).query<Result<Food>[]>(`insert into food values ${food}`)
//         .then(getFirst).then(unwrap);