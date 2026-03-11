// services/recipeService.ts
export const deleteRecipe = async (id: number) => {
    const response = await fetch(`https://localhost:7136/api/Recipe/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete recipe');
    return true;
};

export const fetchIngredientsByRecipeId = async (id: number) => {
    const response = await fetch(`https://localhost:7136/api/RecipeIngredient/recipeId/${id}`);
    if (!response.ok) throw new Error('Failed to fetch ingredients');
    return response.json();
};