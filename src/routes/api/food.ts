import { APIEvent, json } from "solid-start";

import * as foodController from "~/controllers/foodController";

export async function GET(_: APIEvent) {
    return json(await foodController.listFoods());
}