import { Result } from "surreal(await initDB()).js";
import {initDB} from "../utils/surreal_db";
import { DayData } from "../model/dayModel";
import { dayId } from "../utils/date";
import { MealData } from "../model/mealModel";
import { getFirst, unwrap } from "../utils/result";
import { MealItemData } from "~/model/mealItemModel";

const defaultMeals: MealData[] = [
    {
        id: "breakfast",
        name: "Breakfast",
        items: []
    },
    {
        id: "lunch",
        name: "Lunch",
        items: []
    },
    {
        id: "snack",
        name: "Snack",
        items: []
    },
    {
        id: "dinner",
        name: "Dinner",
        items: []
    },
];

const debugLog = <T>(data: T) => {
    console.log("DEBUG LOG");
    console.log(JSON.stringify(data, null, 2));
    return data;
}

const as = <T>(data: any) => data as T;

export const listDays = async () =>
    await (await initDB()).query<Result<DayData[]>[]>(
        `select * from day`
    ).then(getFirst).then(unwrap).then(as<DayData[]>)

export const getDay = async (id: DayData['id']) =>
    await (await initDB()).query<Result<DayData[]>[]>(
        `select *, ->has->meal.* as meals, ->has->meal->has->mealitem as meals.items from day:⟨${id}⟩`
    ).then(getFirst).then(unwrap).then(debugLog).then(as<DayData[]>).then(getFirst);

export const createDay = async (id: DayData['id']) =>
    await (await initDB()).create<DayData>(
        'day', {
            id,
            creationDate: dayId(new Date()),
            meals: [...defaultMeals]
        }
    )
