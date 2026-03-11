import { Role, type UserType } from '../types/UserType';
import axios from './axios';

const url = 'api/auth'; // ודא שהנתיב תואם לנתיב של ה-API בצד השרת

export type RegisterType = Omit<UserType & { password: string }, 'id'>;

export const register = async (user: RegisterType) => {
  user.role = Role.Admin;
  const response = await axios.post(`${url}/register`, user);
  const data = response.data;
  return data;
};

export type LoginType = { userName: string; email: string };

export const login = async (credentials: LoginType) => {
  const response = await axios.post(`${url}/login`, credentials);
  const data = response.data;  
  console.log(data);
    
  return data;
};

export const loginByToken = async (token: string) => {
  const response = await axios.get(`${url}/getUserByToken`, { 
    headers: { 
      token: token 
    } 
  });
  const data = response.data;
  return data;
};

export const getChefByUserId = async (userId:number) => {
  const response = await axios.get(`/api/Chef/user/${userId}`);
  const data = response.data;
  return data;
};
