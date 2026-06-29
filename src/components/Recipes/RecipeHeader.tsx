import { ChefHat } from 'lucide-react';

interface RecipeHeaderProps {
    id: string | undefined;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ id }) => {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
                <ChefHat className="w-8 h-8" />
                <h1 className="text-3xl font-bold">עדכון מתכון</h1>
            </div>
            <p className="text-orange-100">מתכון #{id}</p>
        </div>
    );
};

export default RecipeHeader;
