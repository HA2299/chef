// import { Search, TrendingUp, Sparkles } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

// export default function Hero() {
//   const [searchQuery, setSearchQuery] = useState('');

//   const trendingSearches = ['עוגת גבינה', 'פסטה', 'סלט', 'קינוח', 'מרק'];
//   var navigate=useNavigate() 

//   return (
//     <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden">
//       <div className="absolute inset-0 bg-black/10"></div>
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
//         <div className="text-center">
//           <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
//             <Sparkles className="w-6 h-6 animate-pulse" />
//             <span className="text-sm font-semibold tracking-wider uppercase">גלה עולם של טעמים</span>
//             <Sparkles className="w-6 h-6 animate-pulse" />
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
//             המתכונים הטובים ביותר
//             <br />
//             <span className="bg-white text-orange-500 px-4 py-2 rounded-2xl inline-block mt-2">
//               במקום אחד
//             </span>
//           </h1>

//           <p className="text-xl sm:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
//             גלה אלפי מתכונים מדהימים, למד משפים מובילים, ושתף את היצירות שלך
//           </p>

//           <div className="max-w-2xl mx-auto mb-8">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="חפש מתכונים, מרכיבים או שפים..."
//                 className="w-full px-6 py-5 pr-14 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
//               />
//               <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full hover:scale-110 transition-transform">
//                 <Search className="w-6 h-6 text-white" />
//               </button>
//             </div>

//             <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
//               <TrendingUp className="w-4 h-4" />
//               <span className="text-sm font-medium">חיפושים פופולריים:</span>
//               {trendingSearches.map((term) => (
//                 <button
//                   key={term}
//                   className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium transition-all"
//                 >
//                   {term}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center justify-center gap-4">
//             <button onClick={()=>navigate('/recipeList') } className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
//               צפה במתכונים
//             </button>
//             <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-500 transition-all">
//               הפוך לשף
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
//     </div>
//   );
// }
import { Search, ChefHat } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../routes/paths'

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
