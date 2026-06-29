import { Role, type UserType } from '../types/user.type';
import axios from './axios';

const url = 'api/auth';

export type RegisterType = Omit<UserType & { password: string }, 'id'>;

export const register = async (user: RegisterType) => {
  user.role = Role.Admin;
  const response = await axios.post(`${url}/register`, user);
  const data = response.data;
  return data;
};

export type LoginType = { userName: string; email: string };

export const login = async (credentials: LoginType) => {
  try {
    const response = await axios.post(`${url}/login`, credentials);
    const data = response.data;
    return data;
  } catch (error: unknown) {
    return null;
  }
};

export const loginByToken = async (token: string) => {
  try {
    const cleanedToken = token.replace(/^Bearer\s+/i, '');
    const response = await axios.get(`${url}/getUserByToken`, {
      headers: {
        token: cleanedToken
      }
    });
    const data = response.data;
    return data;
  } catch (error: unknown) {
    return null;
  }
};


export const getChefByUserId = async (userId: number) => {
  const response = await axios.get(`/api/Chef/user/${userId}`);
  const data = response.data;
  return data;
};
