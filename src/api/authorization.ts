import axios from 'axios';
import { UserToken } from 'store/slices/userSlice.types';
import { AuthorizationParams } from './authorization.types';
import API from './base';

export const signUp = async (user: AuthorizationParams) => {
  const { data } = await axios.post('/signup', user);

  return data;
};

export const signIn = async (user: AuthorizationParams) => {
  const { data }: { data: UserToken } = await API.post('/signin', user);

  return data;
};
