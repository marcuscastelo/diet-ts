import { Component, For } from "solid-js";
import { food } from "./db";

const Foods: Component = () => {
    return (
        <>
            <h1>Foods</h1>

            <For each={food[0]}>
                {(food) => (
                    <div>
                        <h2>{food.name}</h2>
                        <p>{food.macros.carbo}</p>
                        <p>{food.macros.protein}</p>
                        <p>{food.macros.fat}</p>
                    </div>
                )}
            </For>
        </>
    );
};

export default Foods;