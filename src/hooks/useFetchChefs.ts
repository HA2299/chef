import { useState, useEffect } from 'react';
import type { ChefType } from '../types/ChefType';

const useFetchChefs = () => {
  const [availableChefs, setAvailableChefs] = useState<ChefType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch('https://localhost:7136/api/Chef');
        if (!response.ok) {
          throw new Error('Failed to fetch Chefs');
        }
        const data = await response.json();
        setAvailableChefs(data);
      } catch (error) {
        console.error('Error fetching Chefs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  return { availableChefs, loading };
};

export default useFetchChefs;
