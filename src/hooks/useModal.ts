import { useStore } from '../store/useStore';

export default function useModal() {
  const popModal = useStore(state => state.modal.popModal)
  const pushModal = useStore(state => state.modal.pushModal)
  const modalStack = useStore(state => state.modal.modalStack)
  const clearModals = useStore(state => state.modal.clearModals)

  return {
    modalStack,
    pushModal,
    popModal,
    clearModals
  };
}