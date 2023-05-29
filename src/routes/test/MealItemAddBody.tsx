import { isServer } from "solid-js/web";
import MealItemAddBody from "~/components/MealItemAddBody";
import { FoodData } from "~/model/foodModel";
import { MealItemData } from "~/model/mealItemModel";
import { mockFoods } from "./mock/foodMock";
import { Suspense, createResource } from "solid-js";

// Just show the component

const Page = () => {
    const onCancel = () => {
        alert('Cancel callback')
    };

    const onAdd = (mealItem: Partial<MealItemData>) => {
        alert('Add callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    const [foods] = createResource<FoodData[]>(async () => {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        return mockFoods;
    });

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <MealItemAddBody onCancel={onCancel} onAdd={onAdd} foods={foods} />
        </>
    );
};

export default Page;