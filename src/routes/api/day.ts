import { APIEvent, json } from "solid-start";

import * as dayController from "~/controllers/dayController";

export async function GET(_: APIEvent) {
    return json(await dayController.getDay('test'));
}