import { Result } from "surrealdb.js";
import { DayData } from "../model/dayModel";
import { dayId } from "../utils/date";
import { MealData } from "../model/mealModel";
import { getFirst, unwrap } from "../utils/result";
import { MealItemData } from "~/model/mealItemModel";

import * as DayDB from '~/database/day/day'

export const listDays = async () => await DayDB.listDays();

export const getDay = async (id: DayData['id'], create: boolean) => (await DayDB.getDay(id, create));

export const createDay = async (id: DayData['id']) => await DayDB.createDay(id);

export const updateDay = async (data: DayData) => await DayDB.updateDay(data);