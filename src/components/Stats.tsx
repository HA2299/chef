import { BookOpen, Users, ChefHat, Star } from 'lucide-react';
import { useRecipeCount, useChefCount, useUserCount } from '../hooks/useCounts'; // ייבוא ה-Hooks

export default function Stats() {
  const recipeCount = useRecipeCount(); // שימוש ב-Hook למתכונים
  const chefCount = useChefCount();     // שימוש ב-Hook לשפים
  const userCount = useUserCount();     // שימוש ב-Hook למשתמשים

  const stats = [
    { icon: BookOpen, value: recipeCount, label: 'מתכונים', color: 'from-orange-500 to-red-500' },
    { icon: ChefHat, value: chefCount, label: 'שפים מקצועיים', color: 'from-red-500 to-pink-500' },
    { icon: Users, value: userCount, label: 'משתמשים פעילים', color: 'from-pink-500 to-purple-500' },
    { icon: Star, value: '4.9', label: 'דירוג ממוצע', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
