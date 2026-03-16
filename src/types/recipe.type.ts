import type { RecipeIngredientType } from "./recipeIngredient.type";

export interface RecipeType {
    id?:number;
    title: string;
    description: string;
    ingredients: Array<{ id: string }> | RecipeIngredientType[];
    instructions: string;
    preparationTime: number;
    cookingTime: number;
    difficultyLevel: number;
    categoryId: number | null;
    numDoses:number;
    image:string;
    chefId:number;
    rating:number;
    chefName?:string
}
