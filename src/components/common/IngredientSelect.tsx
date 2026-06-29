import React from 'react';
import type { IngredientType } from '../../types/ingredient.type';

interface IngredientSelectProps {
    selectedIngredientId: number | null;
    index: number;
    ingredient: IngredientType; // כאן נשאר כאובייקט
    availableIngredients: Array<{ id: number; name: string }>;
    onChange: (index: number, value: IngredientType) => void; // נשאר כאובייקט
    selectedIngredients: number[];
    setSelectedIngredientId:(id: number | null) => void;
}

const IngredientSelect: React.FC<IngredientSelectProps> = ({index, availableIngredients, onChange, selectedIngredients,setSelectedIngredientId }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const selectedIngredient = availableIngredients.find(ing => ing.id === selectedId);
        if (selectedIngredient) {
            onChange(index, { id: selectedIngredient.id, name: selectedIngredient.name });
            setSelectedIngredientId(selectedIngredient.id);
        }
            
    };

    return (
        <div className="ingredient-input">
            <h3>{`Ingredient ${index + 1}`}</h3>
                <select value={selectedIngredients[index] || ''} onChange={handleChange}> {/* השתמש ב-ID עבור ה-value */}
                    <option value="">Select an ingredient</option>
                    {availableIngredients.map((ing) => (
                        <option key={ing.id} value={ing.id}>{ing.name}</option>
                    ))}
                </select>
         
        </div>
    );
};

export default IngredientSelect;
