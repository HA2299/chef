import React, { useEffect, useState } from 'react';
import { Clock, Users, ChefHat, Star } from 'lucide-react';
import StarRating from './StarRating';
import { rateRecipe, getUserRating, getRecipeRatings } from '../services/ratingService'

interface RecipeDetailEnhancedProps {
    recipeId: string;
    title: string;
    description: string;
    instructions: string;
    preparationTime: number;
    cookingTime: number;
    numDoses: number;
    chefName: string;
    difficultyLevel: number;
    ingredients: Array<{
        id: number;
        name: string;
        quantity: number;
        unit: string;
    }>;
}

export default function RecipeDetailEnhanced({
    recipeId,
    title,
    description,
    instructions,
    preparationTime,
    cookingTime,
    numDoses,
    chefName,
    difficultyLevel,
    ingredients,
}: RecipeDetailEnhancedProps) {
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const difficultyText = ['קל', 'בינוני', 'קשה'];
    const difficultyColors = [
        'bg-green-100 text-green-800',
        'bg-yellow-100 text-yellow-800',
        'bg-red-100 text-red-800',
    ];

    useEffect(() => {
        loadRatings();
    }, [recipeId]);

    const loadRatings = async () => {
        const [userRatingData, recipeRatingsData] = await Promise.all([
            getUserRating(recipeId),
            getRecipeRatings(recipeId),
        ]);

        if (userRatingData) {
            setUserRating(userRatingData.rating);
        }

        if (recipeRatingsData) {
            setAverageRating(recipeRatingsData.average_rating || 0);
            setTotalRatings(recipeRatingsData.total_ratings || 0);
        }
    };

    const handleRate = async (rating: number) => {
        setIsSubmitting(true);
        setMessage('');

        const result = await rateRecipe({
            recipeId,
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
                        <h1 className="text-5xl font-bold mb-4 text-right">{title}</h1>
                        <p className="text-xl text-orange-50 mb-6 text-right">{description}</p>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Clock className="w-5 h-5" />
                                    <span>{preparationTime + cookingTime} דק׳</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Users className="w-5 h-5" />
                                    <span>{numDoses} מנות</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <ChefHat className="w-5 h-5" />
                                    <span>{chefName}</span>
                                </div>
                            </div>

                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${difficultyColors[difficultyLevel]}`}
                            >
                                {difficultyText[difficultyLevel]}
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
                                    <p className="text-sm text-gray-500 mt-2">
                                        ({totalRatings} {totalRatings === 1 ? 'דירוג' : 'דירוגים'})
                                    </p>
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

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
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
                                            <span className="font-medium text-gray-800">{ing.name}</span>
                                            <span className="text-sm text-gray-600">
                                                {ing.quantity} {ing.unit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right flex items-center gap-2">
                                    <span className="text-orange-500">👨‍🍳</span>
                                    הוראות הכנה
                                </h3>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-700 text-right leading-relaxed whitespace-pre-line">
                                        {instructions}
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
