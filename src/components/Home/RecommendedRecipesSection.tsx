import type { RecipeType } from "../../types/recipe.type";
import RecipeCard from "../Recipes/RecipeCard";

interface TopRecipesSectionProps {
    topRecipes: RecipeType[];
}
const getDifficultyString = (level: number): 'easy' | 'medium' | 'hard' => {
    switch (level) {
        case 0:
            return 'easy';
        case 1:
            return 'medium';
        case 2:
            return 'hard';
        default:
            return 'easy';
    }
};
const RecommendedRecipesSection: React.FC<TopRecipesSectionProps> = ({ topRecipes }) => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">מתכונים מומלצים</h2>
            <p className="text-xl text-gray-600">הכי פופולריים השבוע</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRecipes.map((recipe, index) => (
                <RecipeCard key={index}
                    chefId={recipe.chefId}
                    title={recipe.title}
                    image={recipe.image}
                    preparationTime={recipe.preparationTime}
                    numDoses={recipe.numDoses}
                    difficultyLevel={getDifficultyString(recipe.difficultyLevel)}
                    rating={recipe.rating} />
            ))}
        </div>
    </section>
);

export default RecommendedRecipesSection;
