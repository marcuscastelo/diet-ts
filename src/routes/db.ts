import { createResource, createSignal, lazy } from "solid-js";
import { FoodProps } from "../types";
import TBCA from '../tbca.json';
import { createStore } from "solid-js/store";
import axios from "axios";
import { createServerData$ } from "solid-start/server";

export const API = axios.create(
    {
        baseURL: "",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })


// export function test() {
//     const [foods] = createResource(async () => {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return [
//             {
//                 name: "Arroz",
//                 macros: {
//                     carbo: 77,
//                     protein: 7,
//                     fat: 1,
//                 },
//             },
//         ]
//     });
//     return { foods };
// }