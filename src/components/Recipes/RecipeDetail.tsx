import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchIngredientsByRecipeId } from '../../services/recipeService';
import type { RecipeIngredientType } from '../../types/recipeIngredient.type';
import { UnitType } from '../../types/unit.type';
import { ChefHat, Clock, Star, Users } from 'lucide-react';
import StarRating from '../StarRating';
import { getRecipeRatings, getUserRating, rateRecipe } from '../../services/ratingService';
import useFetchChefDetails from '../../hooks/useFetchChefDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, type AppDispatch, type RootState } from '../../redux/store';

const getUnitString = (unit: UnitType) => {
    const units: Record<number, string> = {
        [UnitType.Grams]: 'גרם',
        [UnitType.Kilograms]: 'ק"ג',
        [UnitType.Milliliters]: 'מ"ל',
        [UnitType.Liters]: 'ליטר',
        [UnitType.Cups]: 'כוסות',
        [UnitType.Tablespoons]: 'כפות',
        [UnitType.Teaspoons]: 'כפיות',
        [UnitType.Pieces]: 'יחידות'
    };
    return units[unit] || '';
};

const RecipeDetail: React.FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const loadRatings = async () => {
        const [userRatingData, recipeRatingsData] = await Promise.all([
            getUserRating(recipeId ? recipeId : '1'),
            getRecipeRatings(recipeId ? recipeId : '1'),
        ]);

        if (userRatingData) {
            setUserRating(userRatingData.rating);
        }

        if (recipeRatingsData) {
            setAverageRating(recipeRatingsData.rating || 0);
        }
    };
    const handleRate = async (rating: number) => {
        setIsSubmitting(true);
        setMessage('');

        const result = await rateRecipe({
            recipeId: recipeId ? recipeId : '1',
            ratingValue: rating,
        });

        if (result.success) {
            setUserRating(rating);
            setMessage('הדירוג נשמר בהצלחה! 🎉');
            await loadRatings();
        } else {
            setMessage(`שגיאה: ${result.error}`);
        }

        setIsSubmitting(false);
        setTimeout(() => setMessage(''), 3000);
    };


    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes)

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipe = recipes.find(r => r.id === Number(recipeId));
    const chefId = recipe?.chefId;
    const chef = useFetchChefDetails(chefId);
    const [ingredients, setIngredients] = React.useState<RecipeIngredientType[]>([]);

    React.useEffect(() => {
        const fetchIngredients = async () => {
            if (recipe) {
                const data = await fetchIngredientsByRecipeId(recipe.id ? recipe.id : 1);
                setIngredients(data);
            }
        };
        fetchIngredients();
    }, [recipe]);

    const difficultyText = ['קל', 'בינוני', 'קשה'];
    const difficultyColors = [
        'bg-green-100 text-green-800',
        'bg-yellow-100 text-yellow-800',
        'bg-red-100 text-red-800',
    ];

    if (!recipe) {
        return <div className="text-center text-red-500">מתכון לא נמצא</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                        <h1 className="text-5xl font-bold mb-4 text-right">{recipe.title}</h1>
                        <p className="text-xl text-orange-50 mb-6 text-right">{recipe.description}</p>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Clock className="w-5 h-5" />
                                    <span>{recipe.preparationTime + recipe.cookingTime} דק׳</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Users className="w-5 h-5" />
                                    <span>{recipe.numDoses} מנות</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <ChefHat className="w-5 h-5" />
                                    <span>{chef.chef?.user.name}</span>
                                </div>
                            </div>

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${difficultyColors[recipe.difficultyLevel]}`}
                            >
                                {difficultyText[recipe.difficultyLevel]}
                            </span>
                        </div>
                    </div>




                    <div className="p-8">
                        <div className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
                            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                דרגו את המתכון
                            </h2>

                            <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-4">דירוג ממוצע</p>
                                    <div className="flex items-center gap-2 justify-center">
                                        <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                                        <span className="text-4xl font-bold text-gray-800">
                                            {averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-r-2 border-gray-200 h-24 hidden lg:block"></div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-4">
                                        {userRating > 0 ? 'הדירוג שלך' : 'דרג עכשיו'}
                                    </p>
                                    <StarRating
                                        rating={userRating}
                                        onRate={handleRate}
                                        size="large"
                                        showLabel={false}
                                    />
                                    {isSubmitting && (
                                        <p className="text-sm text-orange-500 mt-2">שומר...</p>
                                    )}
                                    {message && (
                                        <p
                                            className={`text-sm mt-2 font-medium ${message.includes('שגיאה') ? 'text-red-500' : 'text-green-500'
                                                }`}
                                        >
                                            {message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div dir='rtl' className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right flex items-center gap-2">
                                    <span className="text-orange-500">🥘</span>
                                    מרכיבים
                                </h3>
                                <ul className="space-y-3 text-right" dir="rtl">
                                    {ingredients.map((ing) => (
                                        <li
                                            key={ing.id}
                                            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <span className="font-medium text-gray-800">{ing.ingredient?.name}</span>
                                            <span className="text-sm text-gray-600">
                                                {ing.quantity} {getUnitString(ing.unit)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div dir="rtl" className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right flex items-center gap-2">
                                    <span className="text-orange-500">👨‍🍳</span>
                                    הוראות הכנה
                                </h3>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-700 text-right leading-relaxed whitespace-pre-line">
                                        {recipe.instructions}
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RecipeDetail