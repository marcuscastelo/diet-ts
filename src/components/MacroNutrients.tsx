import { type Component } from 'solid-js';
import { MacroNutrientsData } from '~/model/macroNutrientsModel';

type MacroNutrientsProps = MacroNutrientsData;

const MacroNutrients: Component<MacroNutrientsProps> = (props: MacroNutrientsProps) => {
    return (
        <>
            <span class="text-success"> C: {Math.round(props.carbs * 100) / 100} </span>
            <span class="text-danger"> P: {Math.round(props.protein * 100) / 100} </span>
            <span class="text-warning"> G: {Math.round(props.fat * 100) / 100} </span>
        </>
    );
}

export default MacroNutrients;