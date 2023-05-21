import { createSignal } from "solid-js";
import { FoodProps } from "../types";
import TBCA from '../tbca.json';
import { createStore } from "solid-js/store";
import axios from "axios";

const all_food = axios.get('http://localhost:4000/food').then(res => res.data).then(data => {
    console.log(all_food);
    return data;
});

// export const food = createStore(TBCA.map(entry => ({
//     name: entry.Nome,
//     macros: {
//         carbo: 10,
//         protein: 20,
//         fat: 30,
//     }
// } as FoodProps)));