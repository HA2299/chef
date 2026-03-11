import type { RecipeType } from "./RecipeType";
import type { UserType } from "./UserType";

export interface ChefType {
    id: number,
    userId: number,
    user: UserType,
    recipes: RecipeType[]
    image: string;
    averageRating:number;
}