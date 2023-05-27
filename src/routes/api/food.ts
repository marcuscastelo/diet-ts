import { APIEvent, json } from "solid-start";

export function GET(_: APIEvent) {
    return json([
        {
            name: 'Pizza',
            price: 10
        },
    ]);
}