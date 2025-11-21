export interface ModalState {
  modal: {
    modalStack: JSX.Element[];
    pushModal: (content: JSX.Element) => void;
    popModal: () => void;
    clearModals: () => void;
  };
}
