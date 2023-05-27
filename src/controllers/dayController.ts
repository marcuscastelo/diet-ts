import { Result } from "surrealdb.js";
import db from "../utils/surreal_db";
import { Day } from "../model/dayModel";
import { dayId } from "../utils/date";
import { Meal } from "../model/mealModel";
import { getFirst, unwrap } from "../utils/result";

const defaultMeals: Meal[] = [
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

export const listDays = async () =>
    await db.query<Result<Day[]>[]>(
        `select * from day`
    ).then(getFirst).then(unwrap);

export const getDay = async (id: Day['id']) =>
    await db.query<Result<Day[]>[]>(
        `select * from day:⟨${id}⟩`
    ).then(getFirst).then(unwrap).then(getFirst);

export const createDay = async (id: Day['id']) =>
    await db.create<Day>(
        'day', {
            id,
            creationDate: dayId(new Date()),
            meals: [...defaultMeals]
        }
    )