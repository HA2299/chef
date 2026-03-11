import { ChefHat, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">מתכונים וטעמים</span>
            </div>
            <p className="text-gray-400 mb-6">
              הפלטפורמה המובילה למתכונים, שפים ואוהבי בישול בישראל
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">אודות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">מתכונים</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">שפים</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">קטגוריות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">בלוג</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">עזרה ותמיכה</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">שאלות נפוצות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">תנאי שימוש</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">מדיניות פרטיות</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">צור קשר</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">דרושים</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 space-x-reverse text-gray-400">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>info@recipes.co.il</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse text-gray-400">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>03-1234567</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>תל אביב, ישראל</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">הרשמה לניוזלטר</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="האימייל שלך"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:shadow-lg transition-all">
                  שלח
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 מתכונים וטעמים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
