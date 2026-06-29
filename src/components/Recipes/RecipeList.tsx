import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paths } from '../../routes/paths';
import RecipeCard from './RecipeCard';
import { type AppDispatch, type RootState } from '../../redux/store';
import { fetchRecipes } from '../../redux/thunks';
import { useAuthContext } from '../../auth/useAuthContext';
import { useAuthModal } from '../../context/AuthModalContext';

// פונקציית עזר מחוץ לקומפוננטה כדי למנוע יצירה מחדש בכל Render
const getDifficultyString = (level: number): 'easy' | 'medium' | 'hard' => {
    switch (level) {
        case 0: return 'easy';
        case 1: return 'medium';
        case 2: return 'hard';
        default: return 'easy';
    }
};

const RecipeList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    // שליפת נתונים מה-Redux ומה-Context
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const { user } = useAuthContext();
    const { openLogin } = useAuthModal();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const handleNavigateToDetail = (recipeId: number) => {
        if (user) {
            navigate(`/${Paths.recipeDetail(recipeId.toString())}`);
        } else {
            // שימוש ב-Context הגלובלי במקום ב-State מקומי
            openLogin();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 shadow-md p-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white">
                המתכונים שלנו
            </h1>

            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id} // עדיף להשתמש ב-ID ייחודי מאשר ב-Index
                        title={recipe.title}
                        preparationTime={recipe.preparationTime}
                        numDoses={recipe.numDoses}
                        difficultyLevel={getDifficultyString(recipe.difficultyLevel)}
                        image={recipe.image}
                        chefId={recipe.chefId}
                        rating={recipe.rating}
                        onClick={() => handleNavigateToDetail(recipe.id || 1)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;