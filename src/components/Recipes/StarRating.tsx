import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export default function StarRating({
  rating,
  onRate,
  readonly = false,
  size = 'medium',
  showLabel = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const handleClick = (value: number) => {
    if (readonly || !onRate) return;
    setIsAnimating(true);
    onRate(value);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => {
          const isFilled = value <= displayRating;
          const isHovered = value <= hoverRating;

          return (
            <button
              key={value}
              onClick={() => handleClick(value)}
              onMouseEnter={() => !readonly && setHoverRating(value)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              disabled={readonly}
              className={`
                transition-all duration-200 ease-in-out
                ${!readonly ? 'cursor-pointer hover:scale-125' : 'cursor-default'}
                ${isAnimating && isFilled ? 'animate-bounce' : ''}
                ${readonly ? 'opacity-80' : 'opacity-100'}
              `}
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`
                  ${sizeClasses[size]}
                  transition-all duration-200
                  ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  ${isHovered && !readonly ? 'drop-shadow-lg' : ''}
                `}
              />
            </button>
          );
        })}
      </div>

      {showLabel && (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            {hoverRating > 0 && !readonly ? (
              <span className="text-orange-500 font-bold">
                {hoverRating} {hoverRating === 5 ? '⭐ מושלם!' : '⭐'}
              </span>
            ) : rating > 0 ? (
              <span className="text-gray-600">
                {rating.toFixed(1)} מתוך 5
              </span>
            ) : (
              <span className="text-gray-400">
                {readonly ? 'אין דירוגים' : 'לחץ לדירוג'}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
