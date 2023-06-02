import { Select, createOptions } from "@thisbeyond/solid-select";
import { Accessor, Setter, type Component, Resource, Suspense } from 'solid-js';
import { FoodData } from '~/model/foodModel';

type FoodSelectorProperties = {
    selectedFood: Accessor<FoodData | undefined>;
    setSelectedFood: Setter<FoodData | undefined>;
    onChange?: (selectedFood: FoodData | undefined) => void;
    foods: Resource<FoodData[] | undefined>;
}

const FoodSelector: Component<FoodSelectorProperties> = (props) => {
    const { selectedFood, setSelectedFood, foods, onChange } = props;

    const fallback = [{ name: 'Loading...' }];

    const options = () =>
        createOptions(
            foods() ?? fallback,
            {key: 'name'});

    const format = (data: any, type: 'option' | 'value') => {
        
        if (type == 'option') {
            const food: FoodData = data.value;
            return `(C: ${food['Carboidrato total']} P: ${food['Proteína']} F: ${food['Lipídios']}) ${food.name} `;
        } else {
            const food: FoodData = data;
            return `${food.name}`;
        }
    }

    const handleFilter = (selectedFood: FoodData) => {
        setSelectedFood(selectedFood);
        onChange?.(selectedFood);
    }

    if (!foods()) return <> Loading... </>;

    return <>
        <Suspense fallback={<div>fallback: Loading...</div>}>
            <Select
                placeholder='Alimento'
                class='custom'
                onChange={handleFilter}
                {...options()}
                format={format}
            />
        </Suspense>
    </>;
}

export default FoodSelector;