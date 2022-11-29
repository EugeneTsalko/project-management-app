export interface ModalWindowProps {
  setState: (value: boolean) => void;
  boardId: string;
  columnId: string;
}

export interface ModalWindowModification {
  taskTitle: string;
  taskDescription: string;
}
