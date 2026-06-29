import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateRecipe, updateRecipeIngredients } from '../redux/thunks';
import { fetchRecipeById } from '../redux/thunks';
import { Save, X } from 'lucide-react';
import type { RecipeType } from '../types/recipe.type';
import type { AppDispatch } from '../redux/store';
import useFetchRecipeIngredients from '../hooks/useFetchRecipeIngredients';
import type { RecipeIngredientType } from '../types/recipeIngredient.type';
import IngredientList from '../components/Recipes/IngredientList';
import RecipeHeader from '../components/Recipes/RecipeHeader';
import DifficultyLevel from '../components/common/DifficultyLevel';
import PreparationDetails from '../components/Recipes/PreparationDetails';

export default function UpdateRecipe() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
        }
    }, [id, dispatch]);

    const recipe = useSelector((state: any) => state.recipes.selectedRecipe) as RecipeType;
    useEffect(() => {
        if (recipe) {
            setLocalRecipe(recipe);
        }
    }, [recipe]);

    const loading = useSelector((state: any) => state.recipes.loading);
    const error = useSelector((state: any) => state.recipes.error);
    const { ingredients } = useFetchRecipeIngredients(Number(id));

    const [localRecipe, setLocalRecipe] = useState<RecipeType>({
        title: '',
        description: '',
        preparationTime: 0,
        cookingTime: 0,
        numDoses: 1,
        difficultyLevel: 0,
        instructions: '',
        ingredients: [],
        categoryId: 1,
        image: '',
        chefId: 1,
        rating: 0
    });

    const [localIngredients, setLocalIngredients] = useState<RecipeIngredientType[]>([]);
    const prevLocalIngredientsRef = useRef<RecipeIngredientType[]>([]);

    useEffect(() => {
        const currentRecipeIngredients = ingredients.filter(ingredient => ingredient.recipeId === Number(id));
        if (JSON.stringify(prevLocalIngredientsRef.current) !== JSON.stringify(currentRecipeIngredients)) {
            setLocalIngredients(currentRecipeIngredients);
            prevLocalIngredientsRef.current = currentRecipeIngredients;
        }
    }, [ingredients, id]);

    const handleChange = (field: keyof RecipeType, value: any) => {
        setLocalRecipe(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            dispatch(updateRecipeIngredients({ recipeId: Number(id), ingredients: localIngredients }));
        }
        dispatch(updateRecipe(localRecipe));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>מתכון לא נמצא</div>;

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <RecipeHeader id={id} />
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">שם המתכון</label>
                            <input
                                type="text"
                                value={localRecipe.title}
                                onChange={e => handleChange('title', e.target.value)}
                                placeholder="שם המתכון"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">תיאור</label>
                            <textarea
                                value={localRecipe.description}
                                onChange={e => handleChange('description', e.target.value)}
                                placeholder="תיאור קצר של המתכון..."
                                rows={3}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors resize-none"
                            />
                        </div>
                        <PreparationDetails localRecipe={localRecipe} handleChange={handleChange}/>

                        <DifficultyLevel
                            difficultyLevel={localRecipe.difficultyLevel}
                            handleChange={handleChange}
                        />

                        <IngredientList localIngredients={localIngredients} setLocalIngredients={setLocalIngredients} id={id} />

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">הוראות הכנה</label>
                            <textarea
                                value={localRecipe.instructions}
                                onChange={e => handleChange('instructions', e.target.value)}
                                placeholder="תאר את שלבי ההכנה..."
                                rows={5}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors resize-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Save className="w-5 h-5" />
                                שמור שינויים
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3.5 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                ביטול
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
