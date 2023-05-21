import { Accessor, Resource, Signal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

export type StoreSig<T> = [get: T, set: SetStoreFunction<T>];

export type FoodProps = {
  name: string,
  macros: MacroNutrientsProps,
}

export type MacroNutrientsProps = {
  carbo: number,
  protein: number,
  fat: number,
}

export type MealProps = {
  name: string,
  items: StoreSig<MealItemProps[]>,
}

export type MealItemProps = {
  food: Resource<FoodProps>,
  quantity: number,
}