export type Props = {
  id?: string;
  text: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  type: 'button' | 'submit';
  style: string;
  children?: React.ReactNode;
};

export enum ButtonStyle {
  nav = 'nav',
  form = 'form',
}
