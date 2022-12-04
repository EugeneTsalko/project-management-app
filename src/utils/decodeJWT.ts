import { User } from 'store/slices/userSlice.types';

export const decodeJWT = (token: string): User => {
  const base64Payload = token.split('.')[1];
  const { id, login }: { id: string; login: string; iat: number } = JSON.parse(window.atob(base64Payload));
  return { _id: id, login, name: '' };
};
