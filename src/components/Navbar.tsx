import { useEffect, useState, type FormEvent } from 'react';
import { ChefHat, Search, User, Heart, Menu, X } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Paths } from '../routes/paths';
import { type LoginType } from '../services/auth.services';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuthContext } from '../auth/useAuthContext';
import { setSession } from '../auth/auth.utils';
import { login as loginService } from '../services/auth.services';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navigate = useNavigate();
  const addRecipe = () => {
    navigate(`/${Paths.addRecipe}`);
  }
  useDocumentTitle('Login');
  const { setUser, chefDetails } = useAuthContext(); // הוסף chefDetails
  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as LoginType;
    const user = await loginService(data);
    await setUser(user.user);
    setSession(`Bearer ${user.token}`);
    navigate(`/`);
  };
  useEffect(() => {
  }, [chefDetails]);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span style={{ cursor: "pointer" }} onClick={() => navigate(`/`)} className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                מתכונים וטעמים
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                דף הבית
              </a>
              <a href="/recipeList" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                מתכונים
              </a>
              <a href="/chefs" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                שפים
              </a>
              <a href="#categories" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                קטגוריות
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium mr-6">
                אודות
              </a>
              {chefDetails && (
                <Link to="/my-recipes" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  המתכונים שלי
                </Link>
              )}

            </div>

            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User onClick={() => setIsLoginOpen(true)} className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={addRecipe} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                הוסף מתכון
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isSearchOpen && (
            <div className="pb-4 animate-in slide-in-from-top">
              <input
                type="text"
                placeholder="חפש מתכונים, שפים, מרכיבים..."
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-full focus:outline-none focus:border-orange-500 transition-colors"
                autoFocus
              />
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">דף הבית</a>
              <a href="#recipes" className="block py-2 text-gray-700 hover:text-orange-500">מתכונים</a>
              <a href="#chefs" className="block py-2 text-gray-700 hover:text-orange-500">שפים</a>
              <a href="#categories" className="block py-2 text-gray-700 hover:text-orange-500">קטגוריות</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-orange-500">אודות</a>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mt-4">
                הוסף מתכון
              </button>
            </div>
          </div>
        )}

        {isLoginOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-12 max-w-3xl w-full relative">
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 text-gray-600">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">התחברות</h2>
              <form onSubmit={login}>
                <input type='text' name='userName' placeholder='שם משתמש' className="w-full px-6 py-4 border border-orange-200 rounded-lg mb-4" required />
                <input type='email' name='email' placeholder='אימייל' className="w-full px-6 py-4 border border-orange-200 rounded-lg mb-4" required />
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all w-full">
                  התחבר
                </button>
              </form>
              <span className="block text-center mt-4">
                אין לך חשבון? <Link to={`/${Paths.register}`} className="text-orange-500">הרשמה</Link>
              </span>
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}
