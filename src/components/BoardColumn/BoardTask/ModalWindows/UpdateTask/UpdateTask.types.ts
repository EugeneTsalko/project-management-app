import { TaskInterface } from 'api/boards';

export interface ModalWindowProps {
  setState: (value: boolean) => void;
  data: TaskInterface;
  boardId: string;
  columnId: string;
}

export interface ModalWindowModification {
  taskTitle: string;
  taskDescription: string;
}
