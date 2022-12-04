interface IDecode {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const decodeJWT = (token: string): IDecode => {
  const base64Payload = token.split('.')[1];
  const data = JSON.parse(window.atob(base64Payload)) as IDecode;

  return data;
};
