import { isServer } from 'solid-js/web';
import { clientOnly } from 'solid-start/islands';
import Meal from '~/components/Meal';
import { MealItemData } from '~/model/mealItemModel';

// Just show the component

const Page = () => {
    const onAddItem = () => {
        alert('Add item callback' + (isServer ? ' (server)' : ' (client)'))
    };

    const items: MealItemData[] = [
        {
            name: 'Item 1',
            id: '1',
            mealId: '1',
            foodName: 'Food 1',
            quantity: 100,
            macros: {
                protein: 10,
                carbs: 10,
                fat: 10,
            }
        },
    ];
    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <Meal mealData={{ id: '1', name: "Meal", items: items }} onAddItem={onAddItem} />
        </>
    );
};

export default Page;