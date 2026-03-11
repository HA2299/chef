import { useEffect, useState } from 'react';
import type{ ChefType } from '../types/ChefType';

const useFetchChefDetails = ( chefId: number|undefined) => {
    const [chef, setChef] = useState<ChefType>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChefDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:7136/api/Chef/${chefId}`); // החלף בכתובת ה-API הנכונה
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const chefData = await response.json();
                setChef(chefData);
                
            } catch (error:any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (chefId) {
            fetchChefDetails();            
        }
    }, [chefId]);

    return { chef, loading, error };
};

export default useFetchChefDetails;
