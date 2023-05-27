export type Food = {
    id: string;
    name: string;
    macros: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}