import { A, ErrorBoundary } from "solid-start";
import MacroNutrients from "./MacroNutrients";
import { Component, Suspense } from "solid-js";
import { emptyMacros, multiplyMacros } from "~/utils/macros";
import { MealItemData } from "~/model/mealItemModel";

export type MealItemProps = {
    // food: Accessor<FoodProps>,
    // quantity: number,
    itemData: MealItemData,
}

const MealItem: Component<MealItemProps> = ({itemData}: MealItemProps) => {
    // const foodMacros = () => props.food()?.macros ?? emptyMacros();
    const macros = multiplyMacros(itemData.food.macros, itemData.quantity);

    return (
        <>
            <div class="row mb-2 g-0">
                <div class="col g-0">
                    <div class="row g-0 bg-dark-grey">
                        <div class="col ps-2">
                            <Suspense fallback={<p>Loading...</p>}>
                                <span class="fs-4">{itemData.food.name}</span>
                            </Suspense>
                        </div>
                    </div>
                    <div class="row bg-dark-grey g-0">
                        <div class="col">
                            <span class="ps-1">
                                <MacroNutrients {...macros} />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-1 g-0 bg-dark-grey d-flex justify-content-end">
                    <span class="align-self-end p-1 pe-3">
                        {itemData.quantity}g
                    </span>
                </div>
                <div class="col col-2 col-sm-1 bg-dark-grey g-0 d-flex justify-content-center border-start border-dark">
                    <div class="pt-2">
                        <A href="/foods" >
                            <ErrorBoundary fallback={(e) => <div>{e.message}</div>}>
                                <i class="fas fa-edit fs-2 mt-2">asdf</i>
                                <i class="bi bi-airplane">dd</i>
                            </ErrorBoundary>
                        </A>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MealItem;