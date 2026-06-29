import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthModalContextType {
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    isRegisterOpen: boolean;
    openRegister: () => void;
    closeRegister: () => void;
    handleSwitchToRegister:()=>void;
    handleSwitchToLogin:()=>void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const openRegister = () => setIsRegisterOpen(true);
    const closeRegister = () => setIsRegisterOpen(false);


    const handleSwitchToRegister = () => {
        closeLogin()
        openRegister()
    };

    const handleSwitchToLogin = () => {
        closeRegister()
        openLogin()
    };


    return (
        <AuthModalContext.Provider value={{ isLoginOpen, openLogin, closeLogin, isRegisterOpen, openRegister, closeRegister,
            handleSwitchToRegister,handleSwitchToLogin
         }
        }>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = (): AuthModalContextType => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error('useAuthModal must be used within an AuthModalProvider');
    }
    return context;
};
