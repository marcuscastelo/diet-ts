import { Accessor, Resource, Signal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { FoodData } from "./model/foodModel";

export type StoreSig<T> = [get: T, set: SetStoreFunction<T>];

export type FoodProps = FoodData

export type MacroNutrientsProps = {
  carbs: number,
  protein: number,
  fat: number,
}

export type MealItemProps = {
  food: Accessor<FoodProps>,
  quantity: number,
}