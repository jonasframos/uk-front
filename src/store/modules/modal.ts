import produce from "immer";
import { StateCreator } from "zustand";
import { ModalState } from "../types/modal";

export const createModalSlice: StateCreator<ModalState> = (set, get) => ({
  modal: {
    modalStack: [],
    pushModal: (content: JSX.Element) => {
      set(
        produce((state: ModalState) => {
          state.modal.modalStack.push(content);
        })
      );
    },
    popModal: () => {
      set(
        produce((state: ModalState) => {
          state.modal.modalStack.pop();
        })
      );
    },
    clearModals: () => {
      set(
        produce((state: ModalState) => {
          state.modal.modalStack = [];
        })
      );
    },
  },
});