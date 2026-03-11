import { useState, useEffect } from 'react';
import type { IngredientType } from '../types/IngredientType';

const useFetchData = () => {
  const [availableIngredients, setAvailableIngredients] = useState<IngredientType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://localhost:7136/api/Ingredient');
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        setAvailableIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { availableIngredients, loading };
};

export default useFetchData;
