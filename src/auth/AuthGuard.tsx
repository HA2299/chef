import { Navigate } from "react-router"
import { useAuthContext } from "./useAuthContext"
import { Paths } from "../routes/paths"
import type { ReactNode } from "react"
import type { Role } from '../types/user.type'

type Props = {
    children: ReactNode;
    roles?: Role[]
}

const AuthGuard = ({ children, roles }: Props) => {
    const { isAuthenticated, isInitialized, user } = useAuthContext()

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthenticated) {
        return <Navigate to={`/${Paths.login}`} />
    }

    if (roles && !roles.includes(user!.role)) {
        return <h1>Unauthorized</h1>
    }

    return <>{children}</>
}

export default AuthGuard