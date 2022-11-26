export interface ModalWindowModification {
  columnTitle: string;
}

export interface ModalWindowProps {
  setState: (value: boolean) => void;
  boardId: string;
}
