import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths';
import AddRecipe from '../components/AddRecipe'
import RecipeList from '../components/RecipeList';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import Navbar from '../components/Navbar';
import RecipeDetail from '../components/RecipeDetail';
import GenerateRecipe from '../components/AIRecipeGenerator';
import Chefs from '../components/Chefs';
import MyRecipes from '../components/MyRecipes';
import SearchPage from '../pages/SearchPage';
import RatingPage from '../pages/RatingPage';

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: Paths.addRecipe,
          element: <AddRecipe />
        },
        {
          path: Paths.recipeList,
          element: <RecipeList />
        },
        {
          path: Paths.login,
          element: <LoginPage />
        },
        {
          path: Paths.register,
          element: <RegisterPage />
        },
        {
          path: Paths.recipeDetail(':recipeId'), // תיקון כאן
          element: <RecipeDetail />
        },
        {
          path: Paths.generateRecipe, // הוסף מסלול חדש
          element: <GenerateRecipe />
        },
        {
          path: Paths.chefs,
          element: <Chefs />
        },
        {
          path: Paths.myRecipes, // הוסף את הנתיב למתכונים שלי
          element: <MyRecipes /> // הנח שיש לך קומפוננטה בשם MyRecipes
        },
        {
          path: Paths.search,
          element: <SearchPage />
        },
        {
          path: `${Paths.rating}/:recipeId`, // הוסף מסלול לדירוג
          element: <RatingPage /> // וודא שיש לך רכיב בשם RatingPage
        }
      ],
    },
    {
      path: '*',
      element: <h1>404 Page not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
