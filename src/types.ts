import { Accessor, Resource, Signal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { FoodData } from "./model/foodModel";

export type StoreSig<T> = [get: T, set: SetStoreFunction<T>];

export type FoodProps = FoodData