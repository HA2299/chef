import { createContext, useEffect, useCallback, useState, type ReactNode } from "react";
import type { UserType } from '../types/UserType';
import type { ChefType } from "../types/ChefType";
import { getSession, setSession } from './auth.utils';
import { loginByToken, getChefByUserId } from '../services/auth.services';

type AuthStateType = {
    user: UserType | null,
    chefDetails: ChefType | null,
    isInitialized: boolean
}

type AuthContextType = AuthStateType & {
    setUser: (user: UserType) => void
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthStateType>({ user: null, chefDetails: null, isInitialized: false });

    const setUser = async (user: UserType) => {
        const chefDetails = await getChefByUserId(user.id);
        setAuthState((prev) => ({ ...prev, user, chefDetails }));
    };

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
        <AuthContext.Provider value={{ ...authState, setUser, isAuthenticated: !!authState.user }}>
            {children}
        </AuthContext.Provider>
    );
}
