import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { setSession } from '../auth/auth.utils';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  register as registerService,
  type RegisterType,
} from '../services/auth.services'
import { Paths } from '../routes/paths';
import { useAuthContext } from '../auth/useAuthContext';
import { Role } from '../types/UserType';

const RegisterPage = () => {
  useDocumentTitle('Register');
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  const register = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as RegisterType;
    const user = await registerService({ ...data, role: Role.User });
    setSession(user.token);
    setUser(user)
    navigate(`/${Paths.home}`)
  };

  return (
    <form onSubmit={register}>
      <input name='name' placeholder='Name' />
      <input type='email' name='email' placeholder='Email' />
      <input type='password' name='password' placeholder='Password' />
      <button>Register</button>
      <span>
        already have an account? <Link to={`/${Paths.login}`}>login</Link>
      </span>
    </form>
  );
};

export default RegisterPage;
