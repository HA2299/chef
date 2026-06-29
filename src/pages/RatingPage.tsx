import StarRating from '../components/Recipes/StarRating'
import { useState } from 'react';

function RatingPage() {
    const [rating, setRating] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    מערכת דירוג מתכונים
                </h1>
                <div className="flex flex-col items-center gap-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">דרגו את המתכון</h2>
                        <p className="text-gray-600 mb-6">לחצו על הכוכבים כדי לתת דירוג</p>
                    </div>

                    <StarRating
                        rating={rating}
                        onRate={setRating}
                        size="large"
                        showLabel={true}
                    />

                    <div className="mt-6 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl w-full">
                        <p className="text-center text-gray-700">
                            {rating === 0 && 'בחרו כוכבים כדי לדרג'}
                            {rating === 1 && '⭐ נסו שוב...'}
                            {rating === 2 && '⭐⭐ יכול להיות יותר טוב'}
                            {rating === 3 && '⭐⭐⭐ מתכון טוב!'}
                            {rating === 4 && '⭐⭐⭐⭐ מתכון מעולה!'}
                            {rating === 5 && '⭐⭐⭐⭐⭐ מתכון מושלם!'}
                        </p>
                    </div>


                    {/* Button to navigate or perform an action */}
                    <button
                        className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-full font-medium hover:shadow-lg transition-all"
                        onClick={() => alert('תודה על הדירוג!')} // Replace with your navigation logic
                    >
                        שלח דירוג
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RatingPage;
