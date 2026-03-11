import { Star, BookOpen, Award } from 'lucide-react';
import { useState } from 'react';
import useFetchChefRecipes from '../hooks/useFetchChefRecpies';

interface ChefCardProps {
  name: string;
  avatar: string;
  specialty: string;
  // recipeCount: number;
  rating: number;
  chefId: number;
}

export default function ChefCard({
  name,
  avatar,
  specialty,
  // recipeCount,
  rating,
  chefId
}: ChefCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { recipes, loading, error } = useFetchChefRecipes(chefId);

  if (loading) {
    return <div>טוען מתכונים...</div>;
  }

  return (
    <div className="group bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-200 group-hover:ring-orange-400 transition-all">
            <img
          src={`data:image/jpeg;base64,${avatar}`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2">
            <Award className="w-5 h-5 text-white" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{specialty}</p>

        <div className="flex items-center justify-center space-x-6 space-x-reverse mb-4 w-full py-3 bg-white/60 rounded-xl">
          <div className="text-center">
            <div className="flex items-center space-x-1 space-x-reverse justify-center">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span className="text-lg font-bold text-gray-800">{recipes.length}</span>
            </div>
            <span className="text-xs text-gray-600">מתכונים</span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-center">
            <div className="flex items-center space-x-1 space-x-reverse justify-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-lg font-bold text-gray-800">{rating}</span>
            </div>
            <span className="text-xs text-gray-600">דירוג</span>
          </div>
        </div>

        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`w-full py-2.5 rounded-full font-medium transition-all ${isFollowing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
            }`}
        >
          {isFollowing ? 'עוקב' : 'עקוב'}
        </button>
      </div>
    </div>
  );
}
