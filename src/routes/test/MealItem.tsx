import MealItem from "~/components/MealItem";
import { MealItemData } from "~/model/mealItemModel";

// Just show the component

const Page = () => {
    const itemData: MealItemData = {
        id: '1',
        mealId: '1',
        quantity: 200,
        food: {
            name: 'Food 1',
            id: '1',
            macros: {
                carbs: 10,
                protein: 15,
                fat: 20,
            }
        }
    };

    return (
        <>
            <MealItem itemData={itemData} />
        </>
    );
}

export default Page;