import { useEffect, useState } from 'react';
import axios from 'axios';

const useRecipeCount = () => {
  const [recipeCount, setRecipeCount] = useState('0');

  useEffect(() => {
    const fetchRecipeCount = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/Recipe/count');
        setRecipeCount(roundAndFormat(response.data));
      } catch (error) {
        console.error("שגיאה בטעינת מספר המתכונים:", error);
      }
    };

    fetchRecipeCount();
  }, []);

  return recipeCount;
};

const useChefCount = () => {
  const [chefCount, setChefCount] = useState('0');

  useEffect(() => {
    const fetchChefCount = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/Chef/count');
        setChefCount(roundAndFormat(response.data));
      } catch (error) {
        console.error("שגיאה בטעינת מספר השפים:", error);
      }
    };

    fetchChefCount();
  }, []);

  return chefCount;
};

const useUserCount = () => {
  const [userCount, setUserCount] = useState('0');

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/User/count');
        setUserCount(roundAndFormat(response.data));
      } catch (error) {
        console.error("שגיאה בטעינת מספר המשתמשים:", error);
      }
    };

    fetchUserCount();
  }, []);

  return userCount;
};

const roundAndFormat = (count:number) => {
  const roundedCount = Math.floor(count / 10) * 10; // עיגול כלפי מטה לעשרות
  return `${roundedCount}+`;
};



export { useRecipeCount, useChefCount, useUserCount };
