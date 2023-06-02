import { FoodData } from '~/model/foodModel'
import TBCAJson from './tbca.json'

const TBCA = TBCAJson as { [id: string]: FoodData };

export const getFoodById = (id: string) => {
    const food = TBCA[id];
}

export const listFoods = () => {
    return Object.values(TBCA);
}