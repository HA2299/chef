import React from 'react';
import StarRating from './StarRating';
import { Star } from 'lucide-react';

interface RatingSectionProps {
    userRating: number;
    averageRating: number;
    handleRate: (rating: number) => void;
    isSubmitting: boolean;
    message: string;
}

const RatingSection: React.FC<RatingSectionProps> = ({ userRating, averageRating, handleRate, isSubmitting, message }) => {
    return (
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
        </div>
    )
};
export default RatingSection;