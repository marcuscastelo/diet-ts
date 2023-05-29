import { Component, For, Suspense, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { FoodProps } from "~/types";
import { createServerData$ } from "solid-start/server";
import { initDB } from "~/utils/surreal_db";
import * as foodController from "~/controllers/foodController";
import { FoodData } from "~/model/foodModel";

export function routeData() {
    const foods = createServerData$(async () => (await foodController.listFoods()).map((item: Omit<FoodData, 'macros'>) => ({
        ...item,
        macros: {
            protein: 100,
            carbs: 100,
            fat: 100,
        }
    } as FoodData))
    );

    return { foods };
}

const Foods: Component = () => {
    const { foods } = useRouteData<typeof routeData>();
    return (
        <>
            <h1>Foods</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <For each={foods()}>
                    {(food) => (
                        <div>
                            <h2>{food.name}</h2>
                            <p>{food.macros.carbs}</p>
                            <p>{food.macros.protein}</p>
                            <p>{food.macros.fat}</p>
                        </div>
                    )}
                </For>
            </Suspense>

        </>
    );
};

export default Foods;