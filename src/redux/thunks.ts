import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RecipeIngredientType } from '../types/recipeIngredient.type';
import type { RecipeType } from '../types/recipe.type';
import type { ChefType } from '../types/chef.type';
import type { UserType } from '../types/user.type';
import axios from '../services/axios';
import type { RegisterType } from '../services/auth.services';


const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Network response was not ok');
    }
    return response.json();
};

export const fetchChefs = createAsyncThunk('chefs/fetchChefs', async () => {
    const response = await fetch('https://localhost:7136/api/Chef');
    return handleResponse(response);
});

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await fetch('https://localhost:7136/api/Recipe');
    return handleResponse(response);
});

export const fetchRecipeById = createAsyncThunk('recipes/fetchRecipeById', async (id: string) => {
    const response = await fetch(`https://localhost:7136/api/Recipe/${id}`);
    return handleResponse(response);
});

export const searchRecipes = createAsyncThunk(
    'recipes/search',
    async (params: { query: string; }) => {
        const queryParams = new URLSearchParams();
        if (params.query) queryParams.append('query', params.query);

        const response = await fetch(`https://localhost:7136/api/Recipe/search?${queryParams.toString()}`);
        return handleResponse(response);
    }
);

export const updateRecipe = createAsyncThunk<RecipeType, RecipeType>(
    'recipes/updateRecipe',
    async (recipe: RecipeType) => {
        const formData = new FormData();
        formData.append('Title', recipe.title);
        formData.append('Description', recipe.description);
        formData.append('Instructions', recipe.instructions);
        formData.append('PreparationTime', recipe.preparationTime.toString());
        formData.append('CookingTime', recipe.cookingTime.toString());
        formData.append('DifficultyLevel', recipe.difficultyLevel.toString());
        formData.append('NumDoses', recipe.numDoses.toString());
        formData.append('Ingredients', JSON.stringify(recipe.ingredients));
        formData.append('ChefId', recipe.chefId.toString());
        formData.append('CategoryId', (recipe.categoryId ? recipe.categoryId : 1).toString());
        if (recipe.image) {
            formData.append('FileImage', recipe.image);
        }

        const response = await fetch(`https://localhost:7136/api/Recipe/${recipe.id}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update recipe');
        }
        
        // השרת מחזיר תגובה ריקה, לכן נחזיר את המתכון המעודכן
        const text = await response.text();
        if (!text) {
            return recipe; // מחזיר את המתכון המקומי אם אין תגובה מהשרת
        }
        return JSON.parse(text);
    }
);

export const updateRecipeIngredients = createAsyncThunk<RecipeIngredientType[], { recipeId: number; ingredients: RecipeIngredientType[] }>(
    'recipes/updateRecipeIngredients',
    async ({ recipeId, ingredients }) => {
        const promises = ingredients.map(async (ingredient) => {
            const formData = new FormData();
            formData.append('Id', ingredient.id ? ingredient.id.toString() : '0'); // שימוש ב'0' במקרה שאין ID
            formData.append('RecipeId', recipeId.toString());
            formData.append('IngredientId', ingredient.ingredientId.toString());
            formData.append('Quantity', ingredient.quantity.toString());
            formData.append('Unit', ingredient.unit.toString());

            const response = await fetch(`https://localhost:7136/api/RecipeIngredient/updateByRecipeId/${recipeId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update ingredients');
            }
            
            const text = await response.text();
            if (!text) {
                return ingredient;
            }
            return JSON.parse(text);
        });

        return Promise.all(promises);
    }
);

export const addChef = createAsyncThunk<ChefType, { chef: ChefType, image: File | null }>(
    'chefs/addChef',
    async ({ chef, image }) => {
        const token = localStorage.getItem('token');        
        const formData = new FormData();
        console.log(token);
        
        // השרת מצפה ל-PascalCase בדרך כלל ב-FormForm
        formData.append('UserId', String(chef.userId));
        formData.append('AverageRating', String(chef.averageRating || 0));
        
        if (image) {
            formData.append('FileImage', image); // חייב להתאים לשם ב-C#
        }

        const response = await fetch('https://localhost:7136/api/Chef', {
            method: 'POST',
            body: formData,
            headers: {
                // חשוב מאוד: הוספת Bearer
                'Authorization': token?.startsWith('Bearer') ? token : `Bearer ${token}`,
                // הערה: כשמשתמשים ב-FormData, אסור להוסיף 'Content-Type': 'application/json'
            },
        });

        return handleResponse(response);
    }
);

export const editChef = createAsyncThunk<ChefType, ChefType>(
    'chefs/editChef',
    async (chef: ChefType) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:7136/api/Chef/${chef.id}`, {
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(chef),
        });
        return handleResponse(response);
    }
);

export const deleteChef = createAsyncThunk<number, number>(
    'chefs/deleteChef',
    async (id: number) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:7136/api/Chef/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete chef');
        }
        return id; // מחזיר את ה-ID של השף שנמחק
    }
);

const url = 'api/auth';
export const addUser = createAsyncThunk<UserType, RegisterType>(
    'users/addUser',
    async (user: RegisterType) => {
        console.log('Attempting to register user:', user);
        const response = await axios.post(`${url}/register`, user);
        const data = response.data;
        console.log('User registered successfully:', data);
        return data;
    }
);
