import { Select, createOptions } from "@thisbeyond/solid-select";
import { Accessor, Component, Resource, Show, Suspense, createEffect, createSignal } from "solid-js";
import { FoodData } from "~/model/foodModel";
import MacroNutrients from "./MacroNutrients";
import { emptyMacros, multiplyMacros } from "~/utils/macros";
import { MealItemEditData } from "~/model/mealItemModel";

type MealItemEditBodyProperties = {
    onCancel: () => void;
    onSave: (mealItem: MealItemEditData) => void;
    foods: Resource<FoodData[]>;
    mealItem: MealItemEditData;
}

const MealItemEditBody: Component<MealItemEditBodyProperties> = (props) => {
    const { foods, mealItem, onSave: onAdd, onCancel } = props;

    const [selectedFood, setSelectedFood] = createSignal<FoodData>(mealItem.food);
    const [quantity, setQuantity] = createSignal(mealItem.quantity);

    createEffect(() => {
        setSelectedFood(mealItem.food);
        setQuantity(mealItem.quantity);
    });

    const foodMacros = () => selectedFood()?.macros;
    const macros = () => multiplyMacros(foodMacros() || emptyMacros(), quantity());

    const canSave = () => selectedFood() !== undefined && quantity() > 0;

    const fallback = [{name: 'Carregando...'}]

    const options = (foods: FoodData[] | undefined) => createOptions(foods ?? fallback, { key: 'name' });

    const handleFilter = (selectedFood: FoodData) => {
        //TODO: optimize
        setSelectedFood(selectedFood);
    }

    return (
        <>
            <div class="row mb-2 g-0">
                <div class="col">
                    <Suspense fallback={<div>fallback: Loading...</div>}>
                        <Select placeholder={mealItem.food.name} class='custom' {...options(foods.latest)} onChange={handleFilter} />
                    </Suspense>
                </div>
            </div>
            <div class="row mb-2 g-0">
                <div class="col">
                    <input type="text" class="form-control custom" placeholder="Quantidade (gramas)" onInput={(e) => setQuantity(parseInt(e.target.value || '0'))} maxLength={5} value={quantity()}/>
                </div>
            </div>
            <div class="row mb-2 g-0 mt-5">
                <h1>Pré-visualização:</h1>
                {
                    (selectedFood() === undefined || quantity() <= 0) ?
                        <>
                            <Show when={selectedFood() === undefined}>
                                <div class="col-12 g-0">
                                    <span class="text-warning fs-5">
                                        Nenhum alimento selecionado!
                                    </span>
                                </div>
                            </Show>
                            <Show when={quantity() <= 0}>
                                <div class="col-12 g-0">
                                    <span class="text-warning fs-5">
                                        Quantidade inválida!
                                    </span>
                                </div>
                            </Show>
                        </> :
                        <>
                            <div class="col g-0">
                                <div class="row g-0 bg-dark-grey">
                                    <div class="col ps-2">
                                        <span class="fs-4">{selectedFood()?.name}</span>
                                    </div>
                                    <div class="row bg-dark-grey g-0">
                                        <div class="col">
                                            <span class="ps-1">
                                                <MacroNutrients {...macros()} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 g-0 bg-dark-grey d-flex justify-content-end">
                                <span class="align-self-end p-1 pe-3">
                                    {quantity()}g
                                </span>
                            </div>
                        </>
                }
            </div>
            <div class="row mb-2 g-4 mt-5">
                <div class="col">
                    <button class="btn btn-secondary w-100 bg p-1" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
                <div class="col">
                    <button disabled={!canSave()} class={`btn ${canSave() ? 'btn-primary' : 'btn-dark text-muted'} w-100 bg p-1`} onClick={() => {
                        const selectedFoodVal = selectedFood();
                        if (selectedFoodVal === undefined) {
                            throw new Error('selectedFood is undefined');
                        }

                        const newMealItem: MealItemEditData = {
                            ...mealItem,
                            food: selectedFoodVal,
                            quantity: quantity(),
                        };
                        
                        onAdd(newMealItem);


                        // setShow(false);
                        // // props.items[1]([...props.items[0], props.items[0][0]]);
                        // const firstMeal = meals()?.[0];

                        // if (firstMeal === undefined) {
                        //     console.error('firstMeal is undefined');
                        //     throw new Error('firstMeal is undefined');
                        // }

                        // const firstMealItemsSetter = firstMeal.items[1];
                        // const firstMealItems = firstMeal.items[0];

                        // const selectedFoodVal = selectedFood();
                        // if (selectedFoodVal === undefined) {
                        //     console.error('selectedFood is undefined');
                        //     throw new Error('selectedFood is undefined');
                        // }

                        // const newMealItem: MealItemProps = {
                        //     food: () => selectedFoodVal,
                        //     quantity: quantity(),
                        // };

                        // // firstMealItemsSetter([...firstMealItems, newMealItem]);
                        // console.log(JSON.stringify(firstMealItems, null, 2));
                        // //dump to json

                        // window.scrollBy(0, 67)
                    }}>
                        Salvar
                    </button>
                </div>
            </div>
        </>
    );
}

export default MealItemEditBody;