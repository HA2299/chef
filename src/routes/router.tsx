import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths';
import AddRecipe from '../components/Recipes/AddRecipe'
import RecipeList from '../components/Recipes/RecipeList';
import HomePage from '../pages/HomePage';
import Navbar from '../components/layout/Navbar';
import RecipeDetail from '../components/Recipes/RecipeDetail';
import GenerateRecipe from '../components/Recipes/AIRecipeGenerator';
import Chefs from '../components/Chefs/Chefs';
import MyRecipes from '../components/Recipes/MyRecipes';
import SearchPage from '../pages/SearchPage';
import RatingPage from '../pages/RatingPage';
import ChefRecipes from '../components/Chefs/ChefRecipes';
import Blog from '../pages/Blog';
import UpdateRecipe from '../pages/updateRecipe';
import ChefManagement from '../components/Chefs/ChefsManagement';
import LoginGuard from '../auth/LoginGuard';
import Login from '../auth/Login'

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
          element: <LoginGuard><AddRecipe /></LoginGuard>
        },
        {
          path: Paths.recipeList,
          element: <RecipeList />
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
          path: `${Paths.rating}/:recipeId`,
          element: <RatingPage />
        },
        {
          path: `${Paths.chefRecipes}/:chefId`,
          element: <ChefRecipes />
        },
        {
          path: Paths.blog,
          element: <Blog />
        },
        {
          path: Paths.updateRecipe(':id'), // עדכון הנתיב
          element: <UpdateRecipe />
        },
        {
          path:Paths.chefManagement,
          element:<ChefManagement/>
        },
        {
          path:Paths.login,
          element:<Login />
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
