import { type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setSession } from './auth.utils';
import { useAuthContext } from './useAuthContext';
import {
    register as registerService,
    type LoginType,
    login as loginService,
    type RegisterType,
} from '../services/auth.services'
import { Role } from '../types/user.type';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const navigate = useNavigate();
    const { setUser } = useAuthContext()


    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries()) as RegisterType;
        console.log('Registration data:', data);
        const isRegistered = await registerService({ ...data, role: Role.User });
        let user;
        if (isRegistered === 'User registered successfully.') {
            const userName=data.name;
            const email=data.email;
            const userLogin:LoginType={userName:userName, email:email};
            user = await loginService(userLogin);

        }
        setSession(user.token);
        setUser(user.user)
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
                    הרשמה
                </h2>
                <p className="text-center text-gray-500 mb-8">הצטרף למשפחת מתכונים וטעמים</p>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">שם משתמש</label>
                        <input
                            type="text"
                            name="name"
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">סיסמה</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="הכנס סיסמה"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all mt-6"
                    >
                        הירשם
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-600">יש לך כבר חשבון? </span>
                    <button
                        onClick={() => {
                            onClose();
                            onSwitchToLogin();
                        }}
                        className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                    >
                        התחבר
                    </button>
                </div>
            </div>
        </div>
    );
}