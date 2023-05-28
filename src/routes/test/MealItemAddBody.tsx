import { isServer } from "solid-js/web";
import MealItemAddBody from "~/components/MealItemAddBody";
import { FoodData } from "~/model/foodModel";
import { MealItemData } from "~/model/mealItemModel";
import { mockFoods } from "./mock/foodMock";

// Just show the component

const Page = () => {
    const onCancel = () => {
        alert('Cancel callback')
    };

    const onAdd = (mealItem: Partial<MealItemData>) => {
        alert('Add callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <MealItemAddBody onCancel={onCancel} onAdd={onAdd} foods={() => mockFoods}/>
        </>
    );
};

export default Page;