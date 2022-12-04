export interface IFormBoardProps {
  setIsFormBoardModal: (value: boolean) => void;
  id?: string;
  title?: string;
  owner?: string;
  users?: string[];
}
