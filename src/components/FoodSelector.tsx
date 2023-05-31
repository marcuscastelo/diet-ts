import { Select, createOptions } from "@thisbeyond/solid-select";
import { Accessor, Setter, type Component, Resource, Suspense } from 'solid-js';
import { FoodData } from '~/model/foodModel';


type FoodSelectorProperties = {
    selectedFood: Accessor<FoodData | undefined>;
    setSelectedFood: Setter<FoodData | undefined>;
    onChange?: (selectedFood: FoodData) => void;
    foods: Resource<FoodData[]>;
}

function FoodSelector(props: FoodSelectorProperties) {
    const { selectedFood, setSelectedFood, foods, onChange } = props;

    const options = (foods: FoodData[] | undefined) => createOptions(foods ?? fallback, { key: 'name' });

    const fallback = [{ name: 'Carregando...' }]

    const handleFilter = (selectedFood: FoodData) => {
        setSelectedFood(selectedFood);
        onChange?.(selectedFood);
    }

    return <>
        <Suspense fallback={<div>fallback: Loading...</div>}>
            <Select placeholder='Alimento' class='custom' {...options(foods.latest)} onChange={handleFilter} />
        </Suspense>
    </>;
}

export default FoodSelector;