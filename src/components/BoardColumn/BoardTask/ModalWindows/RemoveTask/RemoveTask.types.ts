export interface ModalWindowProps {
  setState: (value: boolean) => void;
  boardId: string;
  columnId: string;
  taskId: string;
}
