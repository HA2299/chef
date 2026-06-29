import CategoryCard from "../common/CategoryCard";
import { Coffee, Salad, Pizza, Cake, Soup, Cookie } from 'lucide-react';

const CategoriesSection = () => {
    const categories = [
        { name: 'ארוחות בוקר', icon: Coffee, recipeCount: 342, color: 'from-amber-500 to-orange-500' },
        { name: 'סלטים', icon: Salad, recipeCount: 256, color: 'from-green-500 to-emerald-500' },
        { name: 'פיצות', icon: Pizza, recipeCount: 189, color: 'from-red-500 to-pink-500' },
        { name: 'קינוחים', icon: Cake, recipeCount: 423, color: 'from-pink-500 to-purple-500' },
        { name: 'מרקים', icon: Soup, recipeCount: 178, color: 'from-blue-500 to-cyan-500' },
        { name: 'עוגיות', icon: Cookie, recipeCount: 298, color: 'from-yellow-500 to-amber-500' },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">קטגוריות פופולריות</h2>
                    <p className="text-xl text-gray-600">מצא מה שמתאים לך</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
