export interface ModalWindowProps {
  setState: (value: boolean) => void;
  boardId: string;
  columnId: string;
  tasksLength: number;
}

export interface ModalWindowModification {
  taskTitle: string;
  taskDescription: string;
}
