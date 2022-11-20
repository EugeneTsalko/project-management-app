import axios from 'axios';
import { AuthorizationParams } from './authorization.types';

export const signUp = async (user: AuthorizationParams) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (user: AuthorizationParams) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, user);

    return data;
  } catch (error) {
    console.error(error);
  }
};
