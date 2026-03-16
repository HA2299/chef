import { useState } from 'react';
import { ChefHat, Search, User, Heart, Menu, X } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';
import LoginModal from '../../auth/LoginModal'
import RegisterModal from '../../auth/RegisterModal';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const navigate = useNavigate();
  const { chefDetails } = useAuthContext();

  const addRecipe = () => {
    navigate(`/${Paths.addRecipe}`);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${Paths.search}?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/`)}
                className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
              >
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
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={addRecipe}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
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
                value={searchQuery}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
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
              <button
                onClick={addRecipe}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mt-4"
              >
                הוסף מתכון
              </button>
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <Outlet />
    </>
  );
}