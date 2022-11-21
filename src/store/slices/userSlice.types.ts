export type User = {
  id: string;
  name: string;
  login: string;
};

export type UserState = {
  isAuth: boolean | null;
  isLoading: boolean;
  user: User;
};

export type UserToken = {
  token: string;
};
