import { CloseIcon } from '../../assets/icons';
import useModal from '../../hooks/useModal'

interface ModalProps {
  title: string | JSX.Element;
  children: JSX.Element | JSX.Element[];
  className?: string;
  childrenClassName?: string;
  titleClassName?: string;
  onClose?: () => void;
  notClosable?: boolean; // Don't allow close modal, should close only when call clearModals()
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  className='',
  titleClassName='text-dark-blue font-bold',
  onClose,
  childrenClassName='px-5 pb-5 overflow-y-auto',
  notClosable=false
}) => {
  const { popModal } = useModal();

  const handlePopModal = () => {
    if(onClose) onClose();
    if(!notClosable) popModal();
  }

  document.onkeydown = function (evt) {
    if (evt.keyCode == 27) handlePopModal();
};

  const handleOnBackDropClick = (e: any) => {
    if (e.target.id === 'backdrop') handlePopModal();
  };

  return (
    <div
      id='backdrop'
      className='bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50'
    >
      <div
        className={`bg-white shadow-base min-w-[340px] max-h-[80%] flex flex-col overflow-y-hidden md:rounded-[4px] ${className}`}
      >
        <div className='py-8 px-5'>
          <h1 className={`${titleClassName}`}>{title}</h1>
          {!notClosable && <div
            onClick={handlePopModal}
            className='cursor-pointer absolute right-5 top-0 p-3 rounded-full transition duration-200 ease-in-out hover:bg-gray_0'
          >
            <CloseIcon />
          </div>}
        </div>
        <div className={`${childrenClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
