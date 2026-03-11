import { Clock, Users, Star, Heart, Bookmark } from 'lucide-react';
import { useState } from 'react';
import useFetchChefDetails from '../hooks/useFetchChefDetails';

interface RecipeCardProps {
  chefId:number;
  title: string;
  image: string;
  preparationTime: number;
  numDoses: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  rating:number;
  onClick?: () => void;
}

export default function RecipeCard({
  title,
  chefId,
  image,
  preparationTime,
  numDoses,
  difficultyLevel,
  rating,
  onClick,
}: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const chef=useFetchChefDetails(chefId);  

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const difficultyText = {
    easy: 'קל',
    medium: 'בינוני',
    hard: 'קשה',
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex space-x-2 space-x-reverse">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isBookmarked
                ? 'bg-orange-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficultyLevel]}`}
          >
            {difficultyText[difficultyLevel]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">מאת {chef.chef?.user.name}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1 space-x-reverse">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{preparationTime} דק'</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{numDoses} מנות</span>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">
              {rating}
            </span>
          </div>
        </div>

        <button className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-full font-medium hover:shadow-lg transition-all opacity-0 group-hover:opacity-100">
          צפה במתכון
        </button>
      </div>
    </div>
  );
}
