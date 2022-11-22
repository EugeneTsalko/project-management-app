import { User } from 'store/slices/userSlice.types';

export const decodeJWT = (token: string): User => {
  const base64Payload = token.split('.')[1];
  return JSON.parse(window.atob(base64Payload));
};
