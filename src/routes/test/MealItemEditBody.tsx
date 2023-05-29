import { isServer } from "solid-js/web";
import MealItemEditBody from "~/components/MealItemEditBody";
import { FoodData } from "~/model/foodModel";
import { MealItemData } from "~/model/mealItemModel";
import { mockFoods } from "./mock/foodMock";
import { Suspense, createResource } from "solid-js";

// Just show the component

const Page = () => {
    const onCancel = () => {
        alert('Cancel callback')
    };

    const onSave = (mealItem: Partial<MealItemData>) => {
        alert('Edit callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    const [foods] = createResource<FoodData[]>(async () => {
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
            <MealItemEditBody mealItem={() => dummyItem} onCancel={onCancel} onSave={onSave} foods={foods} />
        </>
    );
};

export default Page;