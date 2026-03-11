import { Clock, ChefHat, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RecipeType } from '../types/RecipeType';
import { Paths } from '../routes/paths'

interface RecipeSearchCardProps {
  recipe: RecipeType;
}

const RecipeSearchCard = ({ recipe }: RecipeSearchCardProps) => {
  const navigate = useNavigate();

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1:
        return { text: 'קל', color: 'bg-green-100 text-green-700' };
      case 2:
        return { text: 'בינוני', color: 'bg-yellow-100 text-yellow-700' };
      case 3:
        return { text: 'מתקדם', color: 'bg-red-100 text-red-700' };
      default:
        return { text: 'לא צוין', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const difficulty = getDifficultyLabel(recipe.difficultyLevel);
  const totalTime = recipe.preparationTime + recipe.cookingTime;

  return (
    <div
      onClick={() => navigate(Paths.recipeDetail(`${recipe.id!}`))}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-orange-300 transform hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={`data:image/jpeg;base64,${recipe.image}`|| 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${difficulty.color}`}>
            {difficulty.text}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-gray-800">4.5</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{totalTime} דקות</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span>{recipe.numDoses} מנות</span>
          </div>
        </div>

        {recipe.chefName && (
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{recipe.chefName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSearchCard;
