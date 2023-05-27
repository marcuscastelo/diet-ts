import { Meal } from "./mealModel";

export type Day = {
    id: string;
    creationDate: string;
    meals: Meal[];
};