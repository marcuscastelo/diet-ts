import { DayData } from '~/model/dayModel';
import DayJson from './day.json';
import fs from 'fs';

const Day = DayJson as DayData;

export const listDays = async () => [Day];

export const getDay = async (id: DayData['id'], create: boolean) => Day;

export const createDay = async (id: DayData['id']) => Day;

export const updateDay = async (data: DayData) => {
    // Save data to database
    const targetFile = './src/database/day/day.json';

    // Write to file with library fs
    fs.writeFileSync(targetFile, JSON.stringify(data), 'utf8');

    return Day;
}