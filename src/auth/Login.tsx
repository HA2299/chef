import LoginModal from "../auth/LoginModal";
import { useAuthModal } from "../context/AuthModalContext";

const Login = () => {
    const { isLoginOpen, closeLogin, handleSwitchToRegister } = useAuthModal();

    return (

        <LoginModal
            isOpen={isLoginOpen}
            onClose={closeLogin}
            onSwitchToRegister={handleSwitchToRegister}
        />
    )
}

export default Login