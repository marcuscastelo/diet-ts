import FoodSelector from "~/components/FoodSelector";
import { mockFoods } from "./mock/foodMock";
import { createResource, createSignal } from "solid-js";
import { FoodData } from "~/model/foodModel";

// Just show the component

const Page = () => {
    const [foodRes] = createResource(async () => {
        return mockFoods;
    });        

    const [selectedFood, setSelectedFood] = createSignal<FoodData | undefined>(undefined);

    return (
        <>
            <FoodSelector 
                foods={foodRes}
                selectedFood={selectedFood}
                setSelectedFood={setSelectedFood}
                />
        </>
    );
}

export default Page;
