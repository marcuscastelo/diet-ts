import { Result } from "surrealdb.js";

export const getFirst = <T>(arr: T[]) => arr[0]
export const unwrap = <T>(res: Result<T>) => {
    if (res.result) 
        return res.result;
    else 
        throw res.error ?? "Unknown error";
}