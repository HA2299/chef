import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../routes/paths'
import RecipeCard from './RecipeCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, type AppDispatch, type RootState } from '../redux/store';

const RecipeList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes)

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const navigate = useNavigate();

    const handleNavigateToDetail = (recipeId: number) => {
        navigate(`/${Paths.recipeDetail(recipeId.toString())}`);
    };

    const getDifficultyString = (level: number): 'easy' | 'medium' | 'hard' => {
        switch (level) {
            case 0:
                return 'easy';
            case 1:
                return 'medium';
            case 2:
                return 'hard';
            default:
                return 'easy';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">המתכונים שלי</h1>
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, index) => {
                    return (
                        <RecipeCard
                            key={index}
                            title={recipe.title}
                            preparationTime={recipe.preparationTime}
                            numDoses={recipe.numDoses}
                            difficultyLevel={getDifficultyString(recipe.difficultyLevel)}
                            image={recipe.image}
                            chefId={recipe.chefId}
                            rating={recipe.rating}
                            onClick={() => handleNavigateToDetail(recipe.id || 1)}
                        />
                    );
                })}

            </div>
        </div>
    );
};

export default RecipeList;
