import FoodSelector from "~/components/FoodSelector";
import { mockFoods } from "./mock/foodMock";
import { createResource, createSignal } from "solid-js";
import { FoodData } from "~/model/foodModel";
import createServerDataFood$ from "~/data/foods";
import { isServer } from "solid-js/web";

// Just show the component

const Page = () => {
    const foodRes = createServerDataFood$();

    const [selectedFood, setSelectedFood] = createSignal<FoodData | undefined>(undefined);

    const onChange = (selectedFood?: FoodData) => {
        alert(`Selected food: ${selectedFood?.name ?? 'undefined'}`);
    }

    return (
        <>
            {isServer && <div>Server</div> || <div>Client</div>}
            <FoodSelector
                foods={foodRes}
                selectedFood={selectedFood}
                setSelectedFood={setSelectedFood}
                onChange={onChange}
            />

            {
                selectedFood() &&
                <div class="mt-4">
                   <h3>Selected food:</h3>
                    <pre>{JSON.stringify(selectedFood(), null, 2)}</pre>
                </div>
            }
        </>
    );
}

export default Page;
