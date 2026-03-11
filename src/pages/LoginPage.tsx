import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setSession } from '../auth/auth.utils';
import {
  login as loginService,
  type LoginType,
} from '../services/auth.services'
import { Paths } from '../routes/paths';
import { useAuthContext } from '../auth/useAuthContext';

const LoginPage = () => {
  useDocumentTitle('Login');
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as LoginType;
    const user = await loginService(data);
    // setUser(user)
    setSession(`Bearer ${user.token}`);
    navigate(`/`)
  };

  return (
    <form onSubmit={login}>
      <input type='userName' name='userName' placeholder='userName' />
      <input type='email' name='email' placeholder='email' />
      <button>Login</button>
      <span>
        don't have an account? <Link to={`/${Paths.register}`}>register</Link>
      </span>
    </form>
  );
};

export default LoginPage;
