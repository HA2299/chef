import { configureStore } from '@reduxjs/toolkit';
import chefsReducer from './chefsSlice';
import recipesReducer from './recipesSlice';

const store = configureStore({
    reducer: {
        chefs: chefsReducer,
        recipes: recipesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
