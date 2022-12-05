export type User = {
  _id: string;
  name: string;
  login: string;
};

export type UserState = {
  user: User | null;
  status: 'Pending' | 'Fulfilled' | 'Rejected';
};

export type UserToken = {
  token: string;
};
