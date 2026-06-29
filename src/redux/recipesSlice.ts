import { createSlice } from '@reduxjs/toolkit';
import type { RecipeType } from '../types/recipe.type';
import { fetchRecipes, fetchRecipeById, searchRecipes, updateRecipe, updateRecipeIngredients } from './thunks';

interface RecipesState {
    recipes: RecipeType[];
    loading: boolean;
    error: string | null;
    selectedRecipe: RecipeType | null;
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
        selectedRecipe: null,
    } as RecipesState,
    reducers: {
        clearRecipes: (state) => {
            state.recipes = [];
            state.error = null;
            state.selectedRecipe = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Fetch failed';
            })
            .addCase(searchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(searchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Search failed';
            })
            .addCase(fetchRecipeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRecipe = action.payload;
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Fetch recipe failed';
            })
            .addCase(updateRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
                state.loading = false;
                const updatedRecipe = action.payload;
                state.recipes = state.recipes.map(recipe =>
                    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
                );
                state.selectedRecipe = updatedRecipe; // אם תרצה לעדכן גם את המתכון הנבחר
            })
            .addCase(updateRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Update failed';
            })
            .addCase(updateRecipeIngredients.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRecipeIngredients.fulfilled, (state, action) => {
                state.loading = false;
                // אם יש צורך לעדכן את המתכון הנבחר או את רשימת המתכונים
                const updatedIngredients = action.payload;
                if (state.selectedRecipe) {
                    state.selectedRecipe.ingredients = updatedIngredients; // עדכון המרכיבים במתכון הנבחר
                }
            })
            .addCase(updateRecipeIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Update ingredients failed';
            });
    }
});

export const { clearRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
