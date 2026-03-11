import type { IngredientType } from "./IngredientType";
import { UnitType } from "./UnitType";

export interface RecipeIngredientType {
    id?: number,
    recipeId: number,
    ingredientId: number,
    ingredient?:IngredientType
    quantity: number,
    unit: UnitType
}
