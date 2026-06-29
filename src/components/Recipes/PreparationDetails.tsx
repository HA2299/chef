import { Clock, Users } from "lucide-react";
import type { RecipeType } from "../../types/recipe.type";

interface PreparationDetailsProps {
    localRecipe: RecipeType;
    handleChange: (field: keyof RecipeType, value: RecipeType[keyof RecipeType]) => void;
}

const PreparationDetails: React.FC<PreparationDetailsProps> = ({ localRecipe, handleChange }) => (
    <div className="grid grid-cols-3 gap-4">
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline ml-1" />זמן הכנה (דק׳)
            </label>
            <input
                type="number"
                value={localRecipe.preparationTime}
                onChange={e => handleChange('preparationTime', Number(e.target.value))}
                placeholder="20"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
            />
        </div>
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline ml-1" />זמן בישול (דק׳)
            </label>
            <input
                type="number"
                value={localRecipe.cookingTime}
                onChange={e => handleChange('cookingTime', Number(e.target.value))}
                placeholder="30"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
            />
        </div>
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4 inline ml-1" />מנות
            </label>
            <input
                type="number"
                value={localRecipe.numDoses}
                onChange={e => handleChange('numDoses', Number(e.target.value))}
                placeholder="4"
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
            />
        </div>
    </div>
);

export default PreparationDetails