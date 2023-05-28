import MealItem from "~/components/MealItem";
import { MealItemData } from "~/model/mealItemModel";

// Just show the component

const Page = () => {
    const itemData: MealItemData = {
        name: 'Item 1',
        id: '1',
        mealId: '1',
        foodName: 'Food 1',
        quantity: 200,
        foodMacros: {
            carbs: 10,
            protein: 15,
            fat: 20,
        }
    };

    return (
        <>
            <MealItem itemData={itemData} />
        </>
    );
}

export default Page;