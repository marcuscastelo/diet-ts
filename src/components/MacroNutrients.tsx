import { type Component } from 'solid-js';

import { MacroNutrientsProps } from '../types';

const MacroNutrients: Component<MacroNutrientsProps> = (props: MacroNutrientsProps) => {
    return (
        <>
            <span class="text-success"> C: {Math.round(props.carbs)} </span>
            <span class="text-danger"> P: {Math.round(props.protein)} </span>
            <span class="text-warning"> G: {Math.round(props.fat)} </span>
        </>
    );
}

export default MacroNutrients;