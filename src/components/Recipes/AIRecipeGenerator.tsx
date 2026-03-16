import { useState } from 'react';
import axios from 'axios';

interface RecipePart {
    text: string; // הגדרת סוג החלק במתכון
}
const GenerateRecipe = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState<RecipePart[] | null>(null); // עדכון ה-state של המתכון

    const handleGenerate = async () => {
        try {
            const requestData = {
                question: `הנה הרכיבים שלי: תן לי מתכון של מאכל שאוכל להכין מרכיבים אלו: ${ingredients}`,
            };

            const response = await axios.post('https://localhost:7136/RecipeAI/ask',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setRecipe(response.data.candidates[0].content.parts);            

        } catch (error: any) {
            console.error("שגיאה ביצירת המתכון:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">צור מתכון</h2>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="...הכנס רכיבים"
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
            />
            <button 
                onClick={handleGenerate} 
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg"
            >
                צור מתכון
            </button>
            <div className="mt-6 text-right">
                <h3 className="text-2xl font-bold mb-4">:מתכון</h3>
                {recipe && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        {recipe.map((part, index) => {
                            const text = part.text;
                            if (text.includes("מרכיבים")) {
                                return (
                                    <div key={index} className="mb-4">
                                        {/* <h4 className="font-semibold text-blue-600">:מרכיבים</h4> */}
                                        <ul style={{ textAlign: 'right', direction: 'rtl' }} className="list-disc list-inside text-right">
                                            {text.split('*').slice(1).map((ingredient, idx) => (
                                                <li key={idx} className="text-gray-800">{ingredient.trim()}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            } else if (text.includes("הוראות")) {
                                return (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold text-blue-600">:הוראות</h4>
                                        <ol className="list-decimal list-inside text-right">
                                            {text.split('1.').slice(1).map((instruction, idx) => (
                                                <li key={idx} className="text-gray-800">{instruction.trim()}</li>
                                            ))}
                                        </ol>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateRecipe;
