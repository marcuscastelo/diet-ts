import { Result } from "surrealdb.js";
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

export const listDays = async () => [
    {
        creationDate: '2023-06-01',
        id: '2023-06-01',
        meals: [
            {
                id: 'breakfast',
                name: 'Breakfast',
                items: [
                ]
            },
        ]
    } as DayData
]

export const getDay = async (id: DayData['id'], create: boolean) => (await listDays())[0]

export const createDay = async (id: DayData['id']) => getDay(id, true)

export const updateDay = async (data: DayData) => getDay(data.id, true)