// const featuredRecipes = [
//     {
//       title: 'עוגת שוקולד עשירה',
//       image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
//       chef: 'שרה כהן',
//       prepTime: 45,
//       servings: 8,
//       rating: 4.8,
//       difficulty: 'medium' as const,
//     },
//     {
//       title: 'פסטה ברטוטויי טרייה',
//       image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
//       chef: 'דוד לוי',
//       prepTime: 30,
//       servings: 4,
//       rating: 4.9,
//       difficulty: 'easy' as const,
//     },
//     {
//       title: 'סלט ירקות צבעוני',
//       image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
//       chef: 'מיכל אברהם',
//       prepTime: 15,
//       servings: 4,
//       rating: 4.7,
//       difficulty: 'easy' as const,
//     },
//     {
//       title: 'סטייק בשר מושלם',
//       image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
//       chef: 'יוסי מזרחי',
//       prepTime: 60,
//       servings: 2,
//       rating: 4.9,
//       difficulty: 'hard' as const,
//     },
//     {
//       title: 'סושי ביתי טרי',
//       image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
//       chef: 'יוקו סאטו',
//       prepTime: 90,
//       servings: 3,
//       rating: 4.8,
//       difficulty: 'hard' as const,
//     },
//     {
//       title: 'פיצה מרגריטה איטלקית',
//       image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
//       chef: 'ג\'ובאני רוסו',
//       prepTime: 50,
//       servings: 4,
//       rating: 4.9,
//       difficulty: 'medium' as const,
//     },
//   ];

//   const topChefs = [
//     {
//       name: 'שרה כהן',
//       avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
//       specialty: 'קונדיטוריה וקינוחים',
//       recipeCount: 127,
//       rating: 4.9,
//     },
//     {
//       name: 'דוד לוי',
//       avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
//       specialty: 'מטבח איטלקי',
//       recipeCount: 98,
//       rating: 4.8,
//     },
//     {
//       name: 'מיכל אברהם',
//       avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
//       specialty: 'בישול בריא',
//       recipeCount: 156,
//       rating: 4.9,
//     },
//     {
//       name: 'יוסי מזרחי',
//       avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
//       specialty: 'בשרים וגריל',
//       recipeCount: 84,
//       rating: 4.7,
//     },
//   ];
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Search, Filter, Clock, ChefHat, TrendingUp, Sparkles, X } from 'lucide-react';
// import { searchRecipes, clearRecipes, type AppDispatch, type RootState } from '../redux/store'
// import RecipeSearchCard from '../components/RecipeSearchCard'

// const SearchPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { recipes, loading } = useSelector((state: RootState) => state.recipes);

//   const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   const categories = [
//     { id: 'breakfast', name: 'ארוחות בוקר', icon: '🍳' },
//     { id: 'lunch', name: 'ארוחות צהריים', icon: '🍽️' },
//     { id: 'dinner', name: 'ארוחות ערב', icon: '🌙' },
//     { id: 'dessert', name: 'קינוחים', icon: '🍰' },
//     { id: 'salad', name: 'סלטים', icon: '🥗' },
//     { id: 'soup', name: 'מרקים', icon: '🍲' },
//   ];

//   const difficulties = [
//     { value: '1', label: 'קל', color: 'bg-green-100 text-green-700' },
//     { value: '2', label: 'בינוני', color: 'bg-yellow-100 text-yellow-700' },
//     { value: '3', label: 'מתקדם', color: 'bg-red-100 text-red-700' },
//   ];

//   useEffect(() => {
//     const query = searchParams.get('q');
//     if (query) {
//       setSearchQuery(query);
//       handleSearch(query);
//     }
//   }, []);

//   const handleSearch = (query: string = searchQuery) => {
//     if (query.trim() || selectedCategory || selectedDifficulty) {
//       dispatch(
//         searchRecipes({
//           query: query.trim(),
//           category: selectedCategory,
//           difficulty: selectedDifficulty,
//         })
//       );

//       const params = new URLSearchParams();
//       if (query.trim()) params.set('q', query.trim());
//       if (selectedCategory) params.set('category', selectedCategory);
//       if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
//       setSearchParams(params);
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCategory('');
//     setSelectedDifficulty('');
//     dispatch(clearRecipes());
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50" dir="rtl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//               חיפוש מתכונים
//             </h1>
//             <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
//           </div>
//           <p className="text-xl text-gray-600">מצא את המתכון המושלם עבורך</p>
//         </div>

//         <div className="max-w-4xl mx-auto mb-8">
//           <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-orange-100">
//             <div className="flex gap-4 mb-4">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="חפש לפי שם מתכון, מרכיב, שף..."
//                   className="w-full px-6 py-4 pr-14 text-lg rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all"
//                 />
//                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
//               </div>
//               <button
//                 onClick={() => handleSearch()}
//                 className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
//               >
//                 חפש
//               </button>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-6 py-4 rounded-xl font-medium transition-all ${
//                   showFilters
//                     ? 'bg-orange-500 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <Filter className="w-6 h-6" />
//               </button>
//             </div>

//             {showFilters && (
//               <div className="pt-6 border-t-2 border-gray-100 space-y-6 animate-in slide-in-from-top">
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-3">קטגוריה</label>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {categories.map((category) => (
//                       <button
//                         key={category.id}
//                         onClick={() =>
//                           setSelectedCategory(
//                             selectedCategory === category.id ? '' : category.id
//                           )
//                         }
//                         className={`p-4 rounded-xl border-2 transition-all text-right ${
//                           selectedCategory === category.id
//                             ? 'border-orange-500 bg-orange-50 scale-105'
//                             : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{category.icon}</span>
//                           <span className="font-medium">{category.name}</span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-3">רמת קושי</label>
//                   <div className="grid grid-cols-3 gap-3">
//                     {difficulties.map((difficulty) => (
//                       <button
//                         key={difficulty.value}
//                         onClick={() =>
//                           setSelectedDifficulty(
//                             selectedDifficulty === difficulty.value ? '' : difficulty.value
//                           )
//                         }
//                         className={`p-4 rounded-xl border-2 font-medium transition-all ${
//                           selectedDifficulty === difficulty.value
//                             ? 'border-orange-500 scale-105 ' + difficulty.color
//                             : 'border-gray-200 hover:border-orange-300 ' + difficulty.color
//                         }`}
//                       >
//                         {difficulty.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {(selectedCategory || selectedDifficulty) && (
//                   <button
//                     onClick={handleClearFilters}
//                     className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <X className="w-5 h-5" />
//                     נקה פילטרים
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="relative">
//               <ChefHat className="w-20 h-20 text-orange-500 animate-bounce" />
//               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
//                 <div className="flex gap-1">
//                   <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//                   <div
//                     className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
//                     style={{ animationDelay: '0.2s' }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
//                     style={{ animationDelay: '0.4s' }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//             <p className="mt-6 text-xl text-gray-600 font-medium">מחפש מתכונים מדהימים...</p>
//           </div>
//         )}

//         {!loading && recipes.length === 0 && searchQuery && (
//           <div className="text-center py-20">
//             <div className="inline-block p-6 bg-orange-100 rounded-full mb-6">
//               <Search className="w-16 h-16 text-orange-500" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-4">לא נמצאו תוצאות</h3>
//             <p className="text-lg text-gray-600 mb-8">
//               נסה לחפש עם מילות מפתח שונות או השתמש בפילטרים
//             </p>
//             <button
//               onClick={handleClearFilters}
//               className="px-8 py-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
//             >
//               נקה חיפוש
//             </button>
//           </div>
//         )}

//         {!loading && recipes.length > 0 && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-6 h-6 text-orange-500" />
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   נמצאו {recipes.length} מתכונים
//                 </h2>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recipes.map((recipe) => (
//                 <RecipeSearchCard key={recipe.id} recipe={recipe} />
//               ))}
//             </div>
//           </div>
//         )}

//         {!loading && !searchQuery && recipes.length === 0 && (
//           <div className="text-center py-20">
//             <div className="inline-block p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mb-6">
//               <Search className="w-16 h-16 text-orange-500" />
//             </div>
//             <h3 className="text-3xl font-bold text-gray-800 mb-4">התחל לחפש</h3>
//             <p className="text-xl text-gray-600">הזן מילת חיפוש למציאת המתכון המושלם</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
