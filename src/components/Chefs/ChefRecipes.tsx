import { useParams } from 'react-router';
import MyRecipes from "../Recipes/MyRecipes";

const ChefRecipes = () => {
    const { chefId } = useParams(); // קבלת ה-chefId מה-URL
    return <MyRecipes isChef={false} chefId={chefId ? parseInt(chefId) : undefined} />; // המרה ל-number
};

export default ChefRecipes;
