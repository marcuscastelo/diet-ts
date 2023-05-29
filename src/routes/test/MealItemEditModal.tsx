import { Resource, Show, Suspense, createResource, createSignal } from "solid-js";
import MealItemEditModal from "~/components/MealItemEditModal";
import { mockFoods } from "./mock/foodMock";
import { isServer } from "solid-js/web";
import { MealItemData, MealItemEditData } from "~/model/mealItemModel";
import { FoodData } from "~/model/foodModel";
import { createServerData$ } from "solid-start/server";

// Just show the component

const Page = () => {
    const [show, setShow] = createSignal(true);

    const onSave = (mealItem: MealItemEditData) => {
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

    const dummyItem: MealItemData = {
        food: mockFoods[1],
        quantity: 1,
        id: '1',
        mealId: '1',
    };
    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <button onClick={() => setShow(!show())}>Toggle</button>
            <MealItemEditModal
                show={show} setShow={setShow}
                mealItem={() => dummyItem}
                foods={food as Resource<FoodData[]>}
                onSave={onSave}
                onCancel={onCancel}
            />
        </>
    );
};

export default Page;