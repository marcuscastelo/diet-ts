import { Accessor, Resource, Signal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { Food } from "./model/foodModel";

export type StoreSig<T> = [get: T, set: SetStoreFunction<T>];

export type FoodProps = Food 
// {
//   name: string,
//   macros: MacroNutrientsProps,
// }

export type MacroNutrientsProps = {
  carbo: number,
  protein: number,
  fat: number,
}

export type MealProps = {
  name: string,
  items: MealItemProps[],
}

export type MealItemProps = {
  food: Accessor<FoodProps>,
  quantity: number,
}