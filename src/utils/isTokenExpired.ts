import { decodeJWT } from './decodeJWT';

export const isTokenExpired = () => {
  const token = window.localStorage.getItem('token');
  const currentDate = new Date();

  if (token) {
    const { exp, iat } = decodeJWT(token);
    const leftTime = (exp - iat) / 60 / 60;

    if (exp * 1000 < currentDate.getTime()) {
      return {
        status: true,
        message: 'Token is expired.',
        leftTime: 0,
      };
    } else {
      return {
        status: false,
        message: 'Valid token',
        leftTime,
      };
    }
  } else {
    return {
      status: false,
      message: "Token doesn't exist",
      leftTime: 0,
    };
  }
};
