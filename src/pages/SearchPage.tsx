import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChefHat, Search, Sparkles, TrendingUp } from 'lucide-react';
import {  type AppDispatch, type RootState } from '../redux/store';
import {searchRecipes} from '../redux/thunks'
import { clearRecipes } from '../redux/recipesSlice';
import RecipeSearchCard from '../components/Recipes/RecipeSearchCard';

const SearchPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading } = useSelector((state: RootState) => state.recipes);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
            handleSearch(query);
        }
    }, []);

    const handleSearch = (query: string = searchQuery) => {
        if (query.trim()) {
            dispatch(searchRecipes({ query: query.trim() }));
            const params = new URLSearchParams();
            if (query.trim()) params.set('q', query.trim());
            setSearchParams(params);
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        dispatch(clearRecipes());
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            חיפוש מתכונים
                        </h1>
                        <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-600">מצא את המתכון המושלם עבורך</p>
                </div>

                <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-100">
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="חפש לפי שם מתכון, מרכיב, שף..."
                                    className="w-full px-6 py-4 pr-14 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                            </div>
                            <button
                                onClick={() => handleSearch()}
                                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                            >
                                חפש
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">/             <div className="relative">
                        <ChefHat className="w-20 h-20 text-orange-500 animate-bounce" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <div
                                    className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                                    style={{ animationDelay: '0.2s' }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                                    style={{ animationDelay: '0.4s' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                        <p className="mt-6 text-xl text-gray-600 font-medium">מחפש מתכונים מדהימים...</p>
                    </div>
                )}

                {!loading && recipes.length === 0 && searchQuery && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">לא נמצאו תוצאות</h3>
                        <p className="text-lg text-gray-600 mb-8">
                            נסה לחפש עם מילות מפתח שונות
                        </p>
                        <button
                            onClick={handleClearFilters}
                            className="px-8 py-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                        >
                            נקה חיפוש
                        </button>
                    </div>
                )}

                {!loading && recipes.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-orange-500" />
                                <h2 className="text-2xl font-bold text-gray-800">
                                    נמצאו {recipes.length} מתכונים
                                </h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <RecipeSearchCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !searchQuery && recipes.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-6">
                            <Search className="w-16 h-16 text-orange-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">התחל לחפש</h3>
                        <p className="text-xl text-gray-600">הזן מילת חיפוש למציאת המתכון המושלם</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
