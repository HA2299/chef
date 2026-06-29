import { Plus, Trash2 } from 'lucide-react';
import { UnitType } from '../../types/unit.type';
import useFetchData from '../../hooks/useFetchData'; // ייבוא של ה-hook שלך
import type { RecipeIngredientType } from '../../types/recipeIngredient.type';

interface IngredientListProps {
    localIngredients: RecipeIngredientType[];
    setLocalIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientType[]>>;
    id: string | undefined;
}

const IngredientList: React.FC<IngredientListProps> = ({ localIngredients, setLocalIngredients, id }) => {
    const { availableIngredients } = useFetchData(); // קבלת המרכיבים הזמינים

    const handleIngredientChange = (index: number, field: keyof RecipeIngredientType, value: any) => {
        const updatedIngredients = [...localIngredients];
        updatedIngredients[index][field] = value;
        setLocalIngredients(updatedIngredients);
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">מרכיבים</label>
            <div className="space-y-2">
                {localIngredients.map((ing, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <select
                            value={ing.ingredientId}
                            onChange={e => handleIngredientChange(i, 'ingredientId', Number(e.target.value))}
                            className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors text-sm"
                        >
                            {availableIngredients.map(ingredient => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={ing.quantity}
                            onChange={e => handleIngredientChange(i, 'quantity', Number(e.target.value))}
                            placeholder="כמות"
                            className="w-20 px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors text-sm"
                        />
                        <input
                            type="text"
                            value={ing.unit}
                            onChange={e => handleIngredientChange(i, 'unit', e.target.value as unknown as UnitType)}
                            placeholder="יחידה"
                            className="w-20 px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const updatedIngredients = localIngredients.filter((_, index) => index !== i);
                                setLocalIngredients(updatedIngredients);
                            }}
                            disabled={localIngredients.length === 1}
                            className="p-2 text-red-400 hover:text-red-600 disabled:opacity-30 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={() => {
                    const updatedIngredients = [
                        ...localIngredients,
                        {
                            recipeId: Number(id),
                            ingredientId: availableIngredients[0]?.id || 1,
                            quantity: 0,
                            unit: UnitType.Cups
                        }
                    ];
                    setLocalIngredients(updatedIngredients);
                }}
                className="mt-3 flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
            >
                <Plus className="w-4 h-4" />
                הוסף מרכיב
            </button>
        </div>
    );
}

export default IngredientList;
