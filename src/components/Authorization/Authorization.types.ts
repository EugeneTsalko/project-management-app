export type AuthorizationValues = {
  name: string;
  login: string;
  password: string;
};

export type Props = {
  type: AuthorizationType;
  onChange: (data: AuthorizationValues) => void;
};

export enum AuthorizationType {
  'signin',
  'signup',
  'edit',
}
