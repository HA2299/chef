import Hero from '../components/layout/Hero';
import Stats from '../components/Home/Stats'
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import About from '../components/Home/About';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchChefs, fetchRecipes, type AppDispatch, type RootState } from '../redux/store';
import TopChefsSection from '../components/Home/TopChefsSection';
import RecommendedRecipesSection from '../components/Home/RecommendedRecipesSection';
import CategoriesSection from '../components/Home/CategoriesSection';

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

      <RecommendedRecipesSection topRecipes={topRecipes}/>
      <CategoriesSection/>
      <About />
      <TopChefsSection topChefs={topChefs}/>

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