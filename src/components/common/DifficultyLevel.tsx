import type { RecipeType } from "../../types/recipe.type";

interface DifficultyLevelProps {
    difficultyLevel: number;
    handleChange: (field: keyof RecipeType, value: any) => void;
}

const DIFFICULTY_LEVELS = ['קל', 'בינוני', 'קשה'];

const DifficultyLevel: React.FC<DifficultyLevelProps> = ({ difficultyLevel, handleChange }) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">רמת קושי</label>
            <div className="flex gap-3">
                {DIFFICULTY_LEVELS.map((level, i) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => handleChange('difficultyLevel', i)}
                        className={`flex-1 py-2.5 rounded-xl font-medium transition-all border-2 ${difficultyLevel === i
                            ? i === 0
                                ? 'bg-green-100 border-green-400 text-green-700'
                                : i === 1
                                    ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                                    : 'bg-red-100 border-red-400 text-red-700'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DifficultyLevel;
