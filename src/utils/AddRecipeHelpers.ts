// AddRecipeHelpers.ts
import { type RecipeIngredientType } from '../types/recipeIngredient.type'
import { UnitType } from '../types/unit.type'
import { type IngredientType } from '../types/ingredient.type';

export const handleIngredientChange = (
    index: number,
    field: keyof RecipeIngredientType,
    value: number | IngredientType | null,
    recipeIngredients: RecipeIngredientType[],
    setRecipeIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientType[]>>,
    setIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>>
) => {
    const newRecipeIngredients = [...recipeIngredients];
    if (field === 'ingredientId' && value != null) {
        const selectedIngredient = value as IngredientType;
        newRecipeIngredients[index] = { ...newRecipeIngredients[index], ingredientId: selectedIngredient.id };
        setIngredients(prev => {
            const newIngredients = [...prev];
            newIngredients[index] = { id: selectedIngredient.id, name: selectedIngredient.name };
            return newIngredients;
        });
    } else {
        newRecipeIngredients[index] = { ...newRecipeIngredients[index], [field]: value };
    }
    setRecipeIngredients(newRecipeIngredients);
};

export const addIngredient = (
    recipeIngredients: RecipeIngredientType[],
    setRecipeIngredients: React.Dispatch<React.SetStateAction<RecipeIngredientType[]>>
) => {
    setRecipeIngredients([...recipeIngredients, { recipeId: 0, ingredientId: 0, quantity: 0, unit: UnitType.Cups } as RecipeIngredientType]);
};
export const handleSubmit = async (
    event: React.FormEvent,
    title: string,
    description: string,
    recipeIngredients: RecipeIngredientType[],
    instructions: string,
    preparationTime: number,
    cookingTime: number,
    difficultyLevel: number,
    selectedCategoryId: number,
    numDoses: number,
    image: File | null, // עדכון סוג הנתון של התמונה
    chefId:number,
    setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>> // הוספת פרמטר עבור הודעת השגיאה
) => {
    event.preventDefault();

    const newRecipe = {
        id: 0,
        title,
        description,
        instructions,
        preparationTime,
        cookingTime,
        difficultyLevel,
        categoryId: selectedCategoryId,
        category: null,
        chefId: chefId,
        chef: null,
        numDoses,
        ingredients: []
    };

    try {
        const formData = new FormData();

        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('Instructions', instructions);
        formData.append('PreparationTime', preparationTime.toString());
        formData.append('CookingTime', cookingTime.toString());
        formData.append('DifficultyLevel', difficultyLevel.toString());
        formData.append('NumDoses', numDoses.toString());
        formData.append('Ingredients', newRecipe.ingredients.toString());
        formData.append('ChefId', newRecipe.chefId.toString())
        formData.append('CategoryId', newRecipe.categoryId.toString())

        if (image) {
            formData.append('FileImage', image); // הוספת התמונה ל-FormData
        }
        console.log([...formData])
        const recipeResponse = await fetch('https://localhost:7136/api/Recipe', {
            method: 'POST',
            body: formData,
        });

        if (!recipeResponse.ok) {
            const errorText = await recipeResponse.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const recipeData = await recipeResponse.json();
        const recipeId = recipeData.id;

        const ingredientPromises = recipeIngredients.map(async (ingredient) => {
            const recipeIngredient: RecipeIngredientType = {
                id: 0,
                recipeId: recipeId,
                ingredientId: ingredient.ingredientId,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
            };

            const response = await fetch('https://localhost:7136/api/RecipeIngredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeIngredient),
            });

            if (!response.ok) {
                throw new Error('Failed to add ingredient');
            }

            return response.json();
        });

        await Promise.all(ingredientPromises);
        console.log('Recipe and ingredients added successfully');
    } catch (error: any) {
        console.error('Error adding recipe or ingredients:', error);
        setErrorMessage ? (error.message + 'You are not allowed to add a recipe') : null; // עדכון הודעת השגיאה
    }
};
