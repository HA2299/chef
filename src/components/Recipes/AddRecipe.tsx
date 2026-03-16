import { useState } from 'react';
import '../../styles/AddRecipe.css'
import CategorySelect from '../CategorySelect';
import useFetchData from '../../hooks/useFetchData';
import type { RecipeIngredientType } from '../../types/recipeIngredient.type';
import type { IngredientType } from '../../types/ingredient.type';
import RecipeIngredientInput from './RecipeIngredientInput';
import { handleIngredientChange, addIngredient, handleSubmit } from '../../utils/AddRecipeHelpers';
import { FaClock, FaFire } from 'react-icons/fa';

const Difficulty = { Easy: 0, Normal: 1, Difficult: 2 } as const;
export type DifficultyLevel = typeof Difficulty[keyof typeof Difficulty];

const AddRecipe = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredientType[]>([]);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [instructions, setInstructions] = useState('');
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(Difficulty.Easy);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [selectedIngredientId, setSelectedIngredientId] = useState<number | null>(null);
  const [numDoses, setNumDoses] = useState<number>(1);
  const [image, setImage] = useState<File | null>(null); // State for image upload

  const { availableIngredients, loading } = useFetchData();
  if (loading) return <div className="loading">Loading ingredients...</div>;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5)); // עדכון כאן ל-5
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="recipe-container">
      <div className="stepper">
        {['Title', 'Ingredients', 'Instructions', 'Time & Difficulty', 'Category', 'Image'].map((label, idx) => (
          <div key={idx} className={`step ${step >= idx ? 'active' : ''}`}>
            {label}
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            title,
            description,
            recipeIngredients,
            instructions,
            preparationTime,
            cookingTime,
            difficultyLevel,
            selectedCategoryId,
            numDoses,
            image // Include image in submission
          )
        }
        className="recipe-form"
      >
        {step === 0 && (
          <>
            <h2>Recipe Title</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <h2>Description</h2>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </>
        )}

        {step === 1 && (
          <>
            <h2>Ingredients</h2>
            {recipeIngredients.map((ingredient, index) => (
              <div key={index} className="ingredient-card">
                <RecipeIngredientInput
                  selectedIngredientId={selectedIngredientId}
                  index={index}
                  ingredient={ingredient}
                  ingredients={ingredients}
                  availableIngredients={availableIngredients}
                  onChange={(i, field, value) =>
                    handleIngredientChange(i, field, value, recipeIngredients, setRecipeIngredients, setIngredients)
                  }
                  setSelectedIngredientId={setSelectedIngredientId}
                />
                <button
                  type="button"
                  className="remove-chip"
                  onClick={() => setRecipeIngredients((prev) => prev.filter((_, idx) => idx !== index))}
                >
                  &times;
                </button>
              </div>
            ))}
            <button type="button" className="add-ingredient-btn" onClick={() => addIngredient(recipeIngredients, setRecipeIngredients)}>
              + Add Ingredient
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Instructions</h2>
            <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          </>
        )}

        {step === 3 && (
          <>
            <h2><FaClock /> Preparation Time (minutes)</h2>
            <input type="number" placeholder="Preparation Time" value={preparationTime} onChange={(e) => setPreparationTime(Number(e.target.value))} required />

            <h2><FaClock /> Cooking Time (minutes)</h2>
            <input type="number" placeholder="Cooking Time" value={cookingTime} onChange={(e) => setCookingTime(Number(e.target.value))} required />

            <h2><FaFire /> Difficulty Level</h2>
            <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(Number(e.target.value) as DifficultyLevel)}>
              <option value={Difficulty.Easy}>Easy</option>
              <option value={Difficulty.Normal}>Normal</option>
              <option value={Difficulty.Difficult}>Difficult</option>
            </select>

            <h2>Servings</h2>
            <input
              type="number"
              placeholder="Number of Servings"
              value={numDoses}
              onChange={(e) => setNumDoses(Number(e.target.value))}
              min={1}
              required
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2>Category</h2>
            <CategorySelect selectedCategoryId={selectedCategoryId} onChange={setSelectedCategoryId} />
          </>
        )}

        {step === 5 && (
          <>
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
          </>
        )}

        <div className="form-navigation">
          {step > 0 && <button type="button" onClick={prevStep} className="prev-btn">← Back</button>}
          {step < 5 && <button type="button" onClick={nextStep} className="next-btn">Next →</button>}
          {step === 5 && <button type="submit" className="submit-btn">Add Recipe</button>}
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
