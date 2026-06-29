import { createSlice } from '@reduxjs/toolkit';
import type { ChefType } from '../types/chef.type';
import { fetchChefs, addChef, editChef, deleteChef } from './thunks';

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
            .addCase(addChef.fulfilled, (state, action) => {
                state.push(action.payload); // מוסיף את השף החדש למצב
            })
            .addCase(editChef.fulfilled, (state, action) => {
                const index = state.findIndex(chef => chef.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload; // מעדכן את השף
                }
            })
            .addCase(deleteChef.fulfilled, (state, action) => {
                return state.filter(chef => chef.id !== action.payload); // מסנן את השף שנמחק
            });
    }
});

export const { setChefs } = chefsSlice.actions;
export default chefsSlice.reducer;
