export type Props = {
  text: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  type: 'button' | 'submit';
  style: string;
};

export enum ButtonStyle {
  nav = 'nav',
  form = 'form',
}
