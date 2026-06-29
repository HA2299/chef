import React from "react";
import { useNavigate } from "react-router";
import type { RecipeType } from "../../types/recipe.type";
import RecipeCard from "../Recipes/RecipeCard";
import { useAuthContext } from "../../auth/useAuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import { Paths } from "../../routes/paths";

interface TopRecipesSectionProps {
    topRecipes: RecipeType[];
}

// פונקציית עזר מחוץ לקומפוננטה - יעיל יותר (לא נוצרת מחדש בכל רינדור)
const getDifficultyString = (level: number): 'easy' | 'medium' | 'hard' => {
    switch (level) {
        case 0: return 'easy';
        case 1: return 'medium';
        case 2: return 'hard';
        default: return 'easy';
    }
};

const RecommendedRecipesSection: React.FC<TopRecipesSectionProps> = ({ topRecipes }) => {
    const { user } = useAuthContext();
    const { openLogin } = useAuthModal(); // שימוש ב-Context הגנרי החדש
    const navigate = useNavigate();

    const handleNavigateToDetail = (recipeId: number) => {
        if (user) {
            navigate(`/${Paths.recipeDetail(recipeId.toString())}`);
        } else {
            // במקום לנהל סטייט מקומי, פשוט קוראים לפונקציה מהקונטקסט
            openLogin();
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">מתכונים מומלצים</h2>
                <p className="text-xl text-gray-600">הכי פופולריים השבוע</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topRecipes.map((recipe) => (
                    <RecipeCard 
                        key={recipe.id} // שימוש ב-ID במקום ב-Index (חשוב לביצועים)
                        chefId={recipe.chefId}
                        title={recipe.title}
                        image={recipe.image}
                        preparationTime={recipe.preparationTime}
                        numDoses={recipe.numDoses}
                        difficultyLevel={getDifficultyString(recipe.difficultyLevel)}
                        rating={recipe.rating}
                        onClick={() => handleNavigateToDetail(recipe.id || 1)}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecommendedRecipesSection;