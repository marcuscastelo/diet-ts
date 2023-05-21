import { Component, For, Suspense, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import { API } from "./db";
import { FoodProps } from "~/types";

export function routeData() {
    const [foods] = createResource(async () => {
        let res = await API.get<FoodProps[]>('http://localhost:4000/food/search?q=frango');
        console.log(`res.data: `, res.data);

        let data = res.data;
        data = data.map((item: FoodProps) => {
            item.macros = {
                protein: 100,
                carbo: 100,
                fat: 100,
            };
            return item;
        });

        console.log(`data: `, data);
        return data;
    });

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
                            <p>{food.macros.carbo}</p>
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