export interface ModalWindowProps {
  confirmAction: () => void;
  denyAction: () => void;
  children: React.ReactNode;
}
