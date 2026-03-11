import { Navigate } from "react-router"
import { useAuthContext } from './useAuthContext'
import { Paths } from "../routes/paths"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const LoginGuard = ({ children }: Props) => {
    const { isAuthenticated, isInitialized } = useAuthContext() || { isAuthenticated: false, isInitialized: false };

    if (!isInitialized) {
        return <h1>Loading...</h1>;
    }

    if (isAuthenticated) {
        return <Navigate to={`/${Paths.addRecipe}`} />;
    }

    return <>{children}</>;
};


export default LoginGuard