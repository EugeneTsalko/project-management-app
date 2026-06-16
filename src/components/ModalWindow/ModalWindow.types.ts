export interface ModalWindowProps {
  type: string;
  actions: {
    confirmAction?: () => void;
    closeWindow: () => void;
  };
  children: React.ReactNode;
}
