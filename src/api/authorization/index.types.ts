export type AuthorizationParams = {
  name?: string;
  login: string;
  password: string;
};

export type SignInPayload = {
  _id: string;
  name: string;
  login: string;
  token: string;
};

export interface ISignUpErrorMessage {
  message: string;
}

export interface ISignUpProps {
  name: string;
  login: string;
  password: string;
}

export interface ISignInProps {
  login: string;
  password: string;
}
