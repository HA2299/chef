import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserType } from '../types/user.type';
import type { ChefType } from "../types/chef.type";
import { getSession, removeSession, setSession } from './auth.utils';
import { loginByToken, getChefByUserId } from '../services/auth.services';

// Type definition for authentication state
type AuthStateType = {
    user: UserType | null,
    chefDetails: ChefType | null,
    isInitialized: boolean
}

// Type definition for authentication context
type AuthContextType = AuthStateType & {
    setUser: (user: UserType) => void
    logout: () => void
    isAuthenticated: boolean
}

// Create authentication context
export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode
}

// Provider component for authentication context
export const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthStateType>({ user: null, chefDetails: null, isInitialized: false });

    // Function to set user and fetch chef details
    const setUser = async (user: UserType) => {
        const chefDetails = await getChefByUserId(user.id);
        setAuthState((prev) => ({ ...prev, user, chefDetails }));
    };

    // Function to log out the user
    const logout = () => {
        removeSession();
        setAuthState({ user: null, chefDetails: null, isInitialized: true }); 
        setSession('');
    };

    // Initialize authentication state on component mount
    useEffect(() => {
        const initialize = async () => {
            const token = getSession();            
            try {
                if (token) {
                    const user = await loginByToken(token);
                    const chef = await getChefByUserId(user.id);
                    setSession(token);
                    setAuthState({ user, chefDetails: chef, isInitialized: true });
                } else {
                    throw new Error('Unauthorized');
                }
            } catch (error) {
                setAuthState((prev) => ({ ...prev, isInitialized: true }));
            }
        };
        initialize();
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, setUser, logout, isAuthenticated: !!authState.user,isInitialized: authState.isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
}
