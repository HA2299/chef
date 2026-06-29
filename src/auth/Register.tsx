import RegisterModal from "../auth/RegisterModal";
import { useAuthModal } from "../context/AuthModalContext";

const Register = () => {
    const { isRegisterOpen, closeRegister, handleSwitchToLogin } = useAuthModal();

    return (
        <RegisterModal
            isOpen={isRegisterOpen}
            onClose={closeRegister}
            onSwitchToLogin={handleSwitchToLogin}
        />

    )
}

export default Register