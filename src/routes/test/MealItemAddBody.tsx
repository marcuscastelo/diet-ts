import { isServer } from "solid-js/web";
import MealItemAddBody from "~/components/MealItemAddBody";
import { FoodData } from "~/model/foodModel";
import { MealItemData } from "~/model/mealItemModel";

// Just show the component

const Page = () => {
    const onCancel = () => {
        alert('Cancel callback')
    };

    const foods: FoodData[] = [
        {
            name: 'Food 1',
            id: '1',
            macros: {
                carbs: 10,
                protein: 15,
                fat: 20,
            }
        },
    ];

    const onAdd = (mealItem: Partial<MealItemData>) => {
        alert('Add callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <MealItemAddBody onCancel={onCancel} onAdd={onAdd} foods={() => foods}/>
        </>
    );
};

export default Page;