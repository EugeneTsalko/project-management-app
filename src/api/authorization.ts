import axios from 'axios';
import { UserToken } from 'store/slices/userSlice.types';
import { AuthorizationParams } from './authorization.types';

export const signUp = async (user: AuthorizationParams) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user);

  return data;
};

export const signIn = async (user: AuthorizationParams) => {
  const { data }: { data: UserToken } = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, user);

  return data;
};
