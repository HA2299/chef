import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const POSTS = [
  { id: 1, title: '10 טיפים לבישול מושלם', excerpt: 'גלה את הסודות שכל שף מקצועי יודע ואיך ליישם אותם במטבח הביתי שלך.', date: '15 מרץ 2024', readTime: '5 דק׳', category: 'טיפים', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { id: 2, title: 'המדריך המלא לתבלינים', excerpt: 'איך לשלב תבלינים נכון ולהפוך כל מנה לפסגה קולינרית.', date: '10 מרץ 2024', readTime: '8 דק׳', category: 'מדריכים', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
  { id: 3, title: 'מתכונים לחג הפסח', excerpt: 'אוסף מתכונים חגיגיים ומיוחדים שיהפכו את הסדר לבלתי נשכח.', date: '5 מרץ 2024', readTime: '6 דק׳', category: 'חגים', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400' },
  { id: 4, title: 'בישול טבעוני: מדריך למתחילים', excerpt: 'הכל שצריך לדעת כדי להתחיל לבשל מנות טבעוניות טעימות ומזינות.', date: '1 מרץ 2024', readTime: '10 דק׳', category: 'טבעונות', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
  { id: 5, title: 'סודות המאפייה הביתית', excerpt: 'הטכניקות שיגרמו ללחם ולמאפים שלך לצאת מושלמים בכל פעם.', date: '25 פבר 2024', readTime: '7 דק׳', category: 'מאפים', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400' },
  { id: 6, title: 'ראיון עם שף יוסי כהן', excerpt: 'שיחה מרתקת על הדרך לעולם הקולינריה ועל הפילוסופיה מאחורי המנות.', date: '20 פבר 2024', readTime: '12 דק׳', category: 'ראיונות', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400' },
];

const CATEGORY_COLORS:any = {
  טיפים: 'bg-blue-100 text-blue-700',
  מדריכים: 'bg-purple-100 text-purple-700',
  חגים: 'bg-yellow-100 text-yellow-700',
  טבעונות: 'bg-green-100 text-green-700',
  מאפים: 'bg-orange-100 text-orange-700',
  ראיונות: 'bg-pink-100 text-pink-700',
};

export default function Blog() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-orange-50 to-red-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">הבלוג שלנו</h1>
        <p className="text-gray-500 text-lg">טיפים, מדריכים וסיפורים מעולם הקולינריה</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-all">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${CATEGORY_COLORS[POSTS[0].category]}`}>{POSTS[0].category}</span>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{POSTS[0].title}</h2>
              <p className="text-gray-500 mb-4 leading-relaxed">{POSTS[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{POSTS[0].date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{POSTS[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.slice(1).map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
                <h3 className="font-bold text-gray-800 text-lg mt-3 mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}