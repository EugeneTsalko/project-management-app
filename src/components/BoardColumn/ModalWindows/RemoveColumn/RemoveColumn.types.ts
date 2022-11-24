import { ColumnInterface } from 'api/boards';

export interface ModalWindowProps {
  setState: (value: boolean) => void;
  columnData: ColumnInterface;
}
