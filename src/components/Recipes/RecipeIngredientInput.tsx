import React from 'react';
import IngredientSelect from '../IngredientSelect';
import UnitSelect from '../UnitSelect';
import type { RecipeIngredientType } from '../../types/recipeIngredient.type';
import type { IngredientType } from '../../types/ingredient.type';

interface RecipeIngredientInputProps {
    selectedIngredientId:number|null;
    index: number;
    ingredient: RecipeIngredientType;
    ingredients: IngredientType[];
    availableIngredients: Array<{ id: number; name: string }>;
    onChange: (index: number, field: keyof RecipeIngredientType, value: number | IngredientType | null) => void;
    setSelectedIngredientId:(id: number | null) => void;

}

const RecipeIngredientInput: React.FC<RecipeIngredientInputProps> = ({ selectedIngredientId,index, ingredient, ingredients, availableIngredients, onChange ,setSelectedIngredientId}) => {
    return (
        <div>
            <IngredientSelect
                selectedIngredientId={selectedIngredientId}
                index={index}
                ingredient={ingredients[index]}
                availableIngredients={availableIngredients}
                onChange={(index, value) => {
                    onChange(index, 'ingredientId', value as number | IngredientType); // השתמש ב-cast
                }}
                selectedIngredients={ingredients.map(ing => ing.id)}
                setSelectedIngredientId={setSelectedIngredientId}
            />
            <h2>Quantity</h2>
            <input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => onChange(index, 'quantity', Number(e.target.value))}
                required
            />
            <h2>Unit</h2>
            <UnitSelect selectedUnitId={ingredient.unit} onChange={(value) => onChange(index, 'unit', value)} />
        </div>
    );
};


export default RecipeIngredientInput;
