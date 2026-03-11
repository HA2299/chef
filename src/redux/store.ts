import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ChefType } from '../types/ChefType';
import type { RecipeType } from '../types/RecipeType';

export const fetchChefs = createAsyncThunk('chefs/fetchChefs', async () => {
    const response = await fetch('https://localhost:7136/api/Chef');
    return response.json();
});

// הוסף את fetchRecipes
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await fetch('https://localhost:7136/api/Recipe');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
});

export const searchRecipes = createAsyncThunk(
    'recipes/search',
    async (params: { query: string; }) => {
        const queryParams = new URLSearchParams();
        if (params.query) queryParams.append('query', params.query);

        const response = await fetch(`https://localhost:7136/api/Recipe/search?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
);

const chefsSlice = createSlice({
    name: 'chefs',
    initialState: [] as ChefType[],
    reducers: {
        setChefs: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChefs.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

interface RecipesState {
    recipes: RecipeType[];
    loading: boolean;
    error: string | null;
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
    } as RecipesState,
    reducers: {
        clearRecipes: (state) => {
            state.recipes = [];
            state.error = null;
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
            });
    }
});

const store = configureStore({
    reducer: {
        chefs: chefsSlice.reducer,
        recipes: recipesSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setChefs } = chefsSlice.actions;
export const { clearRecipes } = recipesSlice.actions;

export default store;
