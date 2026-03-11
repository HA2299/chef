import { useState, useEffect } from 'react';
import type { RecipeType } from '../types/RecipeType';

const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // קבלת הטוקן מה-local storage
        const response = await fetch('https://localhost:7136/api/Recipe', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`, // הוספת הטוקן כאן
            'Content-Type': 'application/json' // הוספת סוג התוכן אם נדרש
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
        
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // אין צורך בתלות בטוקן כי הוא נלקח מה-local storage

  return { recipes, loading, error }; // מחזיר את המערך, מצב טעינה ושגיאה
};

export default useFetchRecipes;
