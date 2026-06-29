
import React from 'react';

interface InstructionsProps {
    instructions: string;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
    return (
        <div dir="rtl" className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-right flex items-center gap-2">
                <span className="text-orange-500">👨‍🍳</span>
                הוראות הכנה
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 text-right leading-relaxed whitespace-pre-line">
                    {instructions}
                </p>
            </div>
        </div>
    )

};
export default Instructions