import Hero from '../components/Hero';
import Stats from '../components/Stats'
import RecipeCard from '../components/RecipeCard';
import ChefCard from '../components/ChefCard';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { Coffee, Salad, Pizza, Cake, Soup, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import About from '../components/About';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChefs, fetchRecipes, type AppDispatch, type RootState } from '../redux/store';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chefs = useSelector((state: RootState) => state.chefs);
  const recipes = useSelector((state: RootState) => state.recipes.recipes)  

  const topChefs = [...chefs]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 4);

  const topRecipes = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);


  useEffect(() => {
    dispatch(fetchChefs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipes());
}, [dispatch]);


  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/generate-recipe');
  };

  const getDifficultyString = (level: number): 'easy' | 'medium' | 'hard' => {
    switch (level) {
      case 0:
        return 'easy';
      case 1:
        return 'medium';
      case 2:
        return 'hard';
      default:
        return 'easy'; // או כל ערך ברירת מחדל אחר שתרצה
    }
  };

  const categories = [
    { name: 'ארוחות בוקר', icon: Coffee, recipeCount: 342, color: 'from-amber-500 to-orange-500' },
    { name: 'סלטים', icon: Salad, recipeCount: 256, color: 'from-green-500 to-emerald-500' },
    { name: 'פיצות', icon: Pizza, recipeCount: 189, color: 'from-red-500 to-pink-500' },
    { name: 'קינוחים', icon: Cake, recipeCount: 423, color: 'from-pink-500 to-purple-500' },
    { name: 'מרקים', icon: Soup, recipeCount: 178, color: 'from-blue-500 to-cyan-500' },
    { name: 'עוגיות', icon: Cookie, recipeCount: 298, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Hero />
      <Stats />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-full mx-auto text-center bg-gradient-to-r from-orange-400 to-red-300 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
        <h2 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">חדש! תגיד לנו מה יש לך בבית</h2>
        <p className="text-2xl text-white mb-8 italic">וניצור מתכון עבורך!</p>
        <button
          onClick={handleNavigate}
          className="px-10 py-5 bg-orange-500 text-white rounded-full font-bold text-lg transition-transform transform hover:scale-110 hover:shadow-xl"
        >
          צור מתכון
        </button>
      </section>

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
      <section className='py-10' id="categories" ></section>
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
      <About />
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">השפים המובילים שלנו</h2>
          <p className="text-xl text-gray-600">למד מהמומחים</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topChefs.map((chef, index) => (
            <ChefCard name={chef.user.name} avatar={chef.image}
              specialty={''} rating={chef.averageRating} chefId={chef.id} key={index} {...chef} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">הצטרף לקהילה שלנו</h2>
          <p className="text-xl mb-8">שתף את המתכונים המיוחדים שלך והפוך לשף המוביל הבא</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
              התחל עכשיו
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-all">
              למד עוד
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
};

export default HomePage;