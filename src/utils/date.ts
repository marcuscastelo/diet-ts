/**
 * Returns the day id of the date (yyyy-mm-dd)
 * @param date date to get the day id from
 * @returns the day id of the date (yyyy-mm-dd)
 */
export function dayId(date: Date) {
    return date.toISOString().split('T')[0];
}