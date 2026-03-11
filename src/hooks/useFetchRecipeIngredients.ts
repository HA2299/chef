import { useState, useEffect } from 'react';
import type { RecipeIngredientType } from '../types/RecipeIngredientType';

const useFetchRecipeIngredients = (recipeId: number) => {
    const [ingredients, setIngredients] = useState<RecipeIngredientType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:7136/api/RecipeIngredient?recipeId=${recipeId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data = await response.json();
                setIngredients(data);
            } catch (error:any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchIngredients();
        }
    }, [recipeId]);

    return { ingredients, loading, error };
};

export default useFetchRecipeIngredients;
