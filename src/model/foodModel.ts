export type Food = {
    id: string;
    name: string;
    macros: {
        protein: number;
        carbs: number;
        fat: number;
    };
}