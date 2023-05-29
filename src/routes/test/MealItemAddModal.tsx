import { Resource, Show, Suspense, createResource, createSignal } from "solid-js";
import MealItemAddModal from "~/components/MealItemAddModal";
import { mockFoods } from "./mock/foodMock";
import { isServer } from "solid-js/web";
import { MealItemAddData } from "~/model/mealItemModel";
import { FoodData } from "~/model/foodModel";
import { createServerData$ } from "solid-start/server";

// Just show the component

const Page = () => {
    const [show, setShow] = createSignal(true);

    const onAdd = (mealItem: MealItemAddData) => {
        alert('Add callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    const onCancel = () => {
        alert('Cancel callback')
    };

    const [food] = createResource<FoodData[]>(async () => {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        return mockFoods;
    });

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <button onClick={() => setShow(!show())}>Toggle</button>
            <MealItemAddModal
                show={show} setShow={setShow}
                foods={food as Resource<FoodData[]>}
                onAdd={onAdd}
                onCancel={onCancel}
            />
        </>
    );
};

export default Page;