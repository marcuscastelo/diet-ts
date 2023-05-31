import { Component, For, Suspense, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { FoodProps } from "~/types";
import { createServerData$ } from "solid-start/server";
import { initDB } from "~/utils/surreal_db";
import * as foodController from "~/controllers/foodController";
import { FoodData } from "~/model/foodModel";
import MacroNutrients from "~/components/MacroNutrients";

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
                            <h2 class="mt-2">{food.name} ({food.id})</h2>
                            <MacroNutrients carbs={food.macros.carbs} protein={food.macros.protein} fat={food.macros.fat} />

                            {
                                (Object.keys(food)).map((key) => (
                                    <div>
                                        <strong>{key}</strong>: {food[key].toString()}
                                    </div>
                                ))
                            }


                        </div>
                    )}
                </For>
            </Suspense>

        </>
    );
};

export default Foods;