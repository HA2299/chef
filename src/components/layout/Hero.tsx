import { Search, ChefHat } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/paths'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${Paths.search}?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-red-400 to-orange-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 -right-20 -top-20 w-96 h-96 bg-white rounded-full"></div>
        <div className="absolute transform -rotate-12 -left-32 -bottom-32 w-96 h-96 bg-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32" dir="rtl">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="w-20 h-20 animate-bounce" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
            גלה מתכונים מדהימים
          </h1>
          <p className="text-xl sm:text-2xl mb-12 opacity-90">
            אלפי מתכונים מהמטבחים הטובים בעולם, במקום אחד
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חפש מתכון, מרכיב או שף..."
                  className="w-full px-8 py-5 pr-16 text-lg rounded-2xl text-gray-800 border-4 border-white focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-2xl"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-10 py-5 bg-white text-orange-500 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                חפש
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
