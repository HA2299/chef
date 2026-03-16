import { type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { type LoginType, login as loginService } from '../services/auth.services';
import { useAuthContext } from '../auth/useAuthContext';
import { setSession } from '../auth/auth.utils'

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as LoginType;
    const user = await loginService(data);
    await setUser(user.user);
    setSession(`Bearer ${user.token}`);
    onClose();
    navigate(`/`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          התחברות
        </h2>
        <p className="text-center text-gray-500 mb-8">ברוכים השבים למתכונים וטעמים</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">שם משתמש</label>
            <input 
              type="text" 
              name="userName" 
              placeholder="הכנס שם משתמש" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">אימייל</label>
            <input 
              type="email" 
              name="email" 
              placeholder="הכנס אימייל" 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all mt-6"
          >
            התחבר
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-gray-600">אין לך חשבון? </span>
          <button 
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
          >
            הרשם עכשיו
          </button>
        </div>
      </div>
    </div>
  );
}