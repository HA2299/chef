import type { IngredientType } from "./ingredient.type";
import { UnitType } from "./unit.type";

export interface RecipeIngredientType {
    id?: number,
    recipeId: number,
    ingredientId: number,
    ingredient?:IngredientType
    quantity: number,
    unit: UnitType
}
