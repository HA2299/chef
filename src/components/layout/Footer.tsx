import { useState } from 'react';
import { ChefHat, Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e:any) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">מתכונים וטעמים</span>
            </div>
            <p className="text-gray-400 mb-6">
              הפלטפורמה המובילה למתכונים, שפים ואוהבי בישול בישראל
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">אודות</Link></li>
              <li><Link to="/recipeList" className="text-gray-400 hover:text-orange-500 transition-colors">מתכונים</Link></li>
              <li><Link to="/chefs" className="text-gray-400 hover:text-orange-500 transition-colors">שפים</Link></li>
              <li><Link to="/#categories" className="text-gray-400 hover:text-orange-500 transition-colors">קטגוריות</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-orange-500 transition-colors">בלוג</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">עזרה ותמיכה</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">שאלות נפוצות</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">תנאי שימוש</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors">מדיניות פרטיות</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">צור קשר</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-orange-500 transition-colors">דרושים</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">צור קשר</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3 space-x-reverse text-gray-400">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@recipes.co.il" className="hover:text-orange-500 transition-colors">
                  info@recipes.co.il
                </a>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse text-gray-400">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:031234567" className="hover:text-orange-500 transition-colors">
                  03-1234567
                </a>
              </li>
            </ul>

            <div>
              <h4 className="font-semibold mb-2">הרשמה לניוזלטר</h4>
              {subscribed ? (
                <p className="text-orange-400 text-sm font-medium">✓ תודה! נרשמת בהצלחה</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="האימייל שלך"
                    required
                    className="flex-1 px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  >
                    שלח
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} מתכונים וטעמים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}