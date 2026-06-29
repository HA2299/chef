import type { RecipeType } from './recipe.type'
import type { UserType } from "./user.type";

export interface ChefType {
    id: number,
    userId: number,
    user?: UserType,
    recipes: RecipeType[]
    image: string;
    averageRating: number;
}
