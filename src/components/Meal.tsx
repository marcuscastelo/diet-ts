import { For, type Component } from 'solid-js';

import MacroNutrients from './MacroNutrients';
import { MealData } from '~/model/mealModel';
import { emptyMacros, multiplyMacros, sumMacros } from '~/utils/macros';
import MealItem from './MealItem';

export type MealProps = {
    onAddItem: () => void,
    mealData: MealData,
    // name: string,
    // items: MealItemProps[],
}

const Meal: Component<MealProps> = ({mealData, onAddItem}: MealProps) => {
    const macros = () => sumMacros(
      mealData.items.map(item => multiplyMacros(item.food.macros, item.quantity))
    );

    return (
      <>
        <div class="row g-0 bg bg-dark rounded p-3 pt-2 mb-2">
          <div class="col">
            <div class="row g-0">
              <span class="fs-1 text-light-emphasis">{mealData.name}</span>
            </div>
            <div class="row g-0 mb-3">
              <span class=""><MacroNutrients {...macros()} /></span>
            </div>
            <For each={mealData.items}>
              {
                (item) =>
                  <MealItem itemData={item} />
              }
            </For>
  
            <button class="btn btn-primary w-100 bg p-1" onClick={onAddItem}>
              Adicionar
            </button>
          </div>
        </div>
      </>
    );
  }

export default Meal;