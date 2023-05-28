import { createSignal } from "solid-js";
import MealItemAddModal from "~/components/MealItemAddModal";
import { mockFoods } from "./mock/foodMock";
import { isServer } from "solid-js/web";
import { MealItemAddData } from "~/model/mealItemModel";

// Just show the component

const Page = () => {
    const [show, setShow] = createSignal(true);

    const onAdd = (mealItem: MealItemAddData) => {
        alert('Add callback: \n' + JSON.stringify(mealItem, null, 2))
    };

    const onCancel = () => {
        alert('Cancel callback')
    };

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <button onClick={() => setShow(!show())}>Toggle</button>
            <MealItemAddModal
                show={show} setShow={setShow} 
                foods={() => mockFoods} 
                onAdd={onAdd}
                onCancel={onCancel}
            />
        </>
    );
};

export default Page;