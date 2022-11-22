import { User } from 'store/slices/userSlice.types';

export const decodeJWT = (token: string): User => {
  const base64Payload = token.split('.')[1];
  const { userId, login }: { userId: string; login: string; iat: number } = JSON.parse(window.atob(base64Payload));
  return { id: userId, login: login, name: '' };
};
