export type AuthorizationParams = {
  name?: string;
  login: string;
  password: string;
};

export type SignInPayload = {
  id: string;
  name: string;
  login: string;
  token: string;
};
