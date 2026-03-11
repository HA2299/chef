import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchChefRecipes = (chefId: number) => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`https://localhost:7136/api/Chef/${chefId}/recipes`);                
                setRecipes(response.data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [chefId]);

    return { recipes, loading, error };
};

export default useFetchChefRecipes;
