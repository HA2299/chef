import { Video as LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: typeof LucideIcon;
  recipeCount: number;
  color: string;
}

export default function CategoryCard({
  name,
  icon: Icon,
  recipeCount,
  color,
}: CategoryCardProps) {
  return (
    <button className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

      <div className="relative flex flex-col items-center text-center space-y-3">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{recipeCount} מתכונים</p>
        </div>
      </div>
    </button>
  );
}
