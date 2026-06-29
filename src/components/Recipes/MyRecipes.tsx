import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../../services/recipeService';
import { Paths } from '../../routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';
import { Pencil, Trash2 } from 'lucide-react';
import useFetchChefRecipes from '../../hooks/useFetchChefRecpies';
import type { RecipeType } from '../../types/recipe.type';
import React, { type FC } from 'react';

interface MyRecipesProps {
    isChef?: boolean; // Indicates if the user is a chef
    chefId?: number; // ID of the chef
}

/**
 * MyRecipes Component
 * 
 * Displays a list of recipes for the authenticated chef or a specified chef.
 * Allows for deleting and editing recipes if the user is a chef.
 */
const MyRecipes: FC<MyRecipesProps> = ({ isChef = true, chefId = 1 }) => {
    const { chefDetails } = useAuthContext(); // Fetch chef details from context
    const navigate = useNavigate(); // Hook for navigation
    const [recipes, setRecipes] = useState<RecipeType[]>([]); // State to hold recipes

    let id = isChef ? (chefDetails ? chefDetails.id : 1) : chefId; // Determine chef ID

    const initialRecipes = useFetchChefRecipes(id); // Fetch recipes for the chef

    useEffect(() => {
        if (!initialRecipes.loading) {
            setRecipes(initialRecipes.recipes); // Update recipes state
        }
    }, [initialRecipes, chefDetails]);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm('האם אתה בטוח שברצונך למחוק מתכון זה?')) { // Confirm deletion
            try {
                await deleteRecipe(id); // Call delete recipe service
                setRecipes((prev) => prev.filter((r) => r.id !== id)); // Update recipes state
            } catch (err) {
                alert('שגיאה במחיקה'); // Error handling
            }
        }
    };

    const handleNavigateToDetail = (recipeId: number) => {
        navigate(`/${Paths.recipeDetail(recipeId.toString())}`); // Navigate to recipe detail
    };

    const getDifficultyString = (level: number) => {
        const levels = ['קל', 'בינוני', 'קשה']; // Difficulty levels in Hebrew
        return levels[level] || 'קל'; // Default to 'קל'
    };

    const getDifficultyColor = (level: number) => {
        const colors = [
            'bg-green-100 text-green-800',
            'bg-yellow-100 text-yellow-800',
            'bg-red-100 text-red-800',
        ];
        return colors[level] || colors[0]; // Default to green
    };

    if (initialRecipes.loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="text-center">טוען...</div> {/* Loading state */}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 text-center mb-12 shadow-lg p-6 rounded-lg"
                    style={{ animation: 'blink 1s steps(2, start) infinite' }}>
                    :המתכונים
                </h1>

                {recipes.length === 0 ? (
                    isChef ? (
                        <div className="text-center text-gray-600" dir="rtl">
                            <p className="text-xl mb-4">אין לך מתכונים עדיין</p>
                            <button
                                onClick={() => navigate(`/${Paths.addRecipe}`)}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
                            >
                                הוסף מתכון ראשון
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-gray-600" dir="rtl">
                            <p className="text-xl mb-4">אין מתכונים זמינים להצגה</p>
                        </div>
                    )
                ) : (
                    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative"
                            >
                                <div onClick={() => handleNavigateToDetail(recipe.id ? recipe.id : 1)}>
                                    <div className="relative overflow-hidden h-56">
                                        <img
                                            src={`data:image/jpeg;base64,${recipe.image}`}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-3 left-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                                                    recipe.difficultyLevel
                                                )}`}
                                            >
                                                {getDifficultyString(recipe.difficultyLevel)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                                            {recipe.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>{recipe.preparationTime} דק'</span>
                                            <span>{recipe.numDoses} מנות</span>
                                        </div>
                                    </div>
                                </div>
                                {isChef && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <button
                                            onClick={(e) => handleDelete(e, recipe.id ? recipe.id : 1)}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/${Paths.updateRecipe((recipe.id ? recipe.id : 1).toString())}`)}
                                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg"
                                        >
                                            <Pencil className="w-5 h-5" /> {/* Edit recipe button */}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRecipes;
