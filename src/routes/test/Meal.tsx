import { isServer } from 'solid-js/web';
import Meal from '~/components/Meal';
import { MealItemData } from '~/model/mealItemModel';

// Just show the component

const Page = () => {
    const onAddItem =  async () => {
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

    const onEditItem = async (item: MealItemData) => {
        alert('Edit item callback' + (isServer ? ' (server)' : ' (client)') + '\n' + JSON.stringify(item, null, 2))
    };

    const onDeleteItem = async (item: MealItemData) => {
        alert('Delete item callback' + (isServer ? ' (server)' : ' (client)') + '\n' + JSON.stringify(item, null, 2))
    };

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <Meal mealData={{ id: '1', name: "Meal", items: items }} onAddItem={onAddItem} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
        </>
    );
};

export default Page;