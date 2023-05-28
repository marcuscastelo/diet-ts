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
            id: '1',
            mealId: '1',
            quantity: 200,
            food: {
                name: 'Food 1',
                id: '1',
                macros: {
                    carbs: 20,
                    protein: 10,
                    fat: 15,
                }
            },
        }
    ];

    items.push(items[0]);

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <Meal mealData={{ id: '1', name: "Meal", items: items }} onAddItem={onAddItem} />
        </>
    );
};

export default Page;