import Modal from '../../../components/Modal/Modal';
import FilledButton from '../../../components/Buttons/FilledButton';

export interface BuildingInfoModalProps {
    name: string;
    level: number;
}

const BuildingInfoModal: React.FC<BuildingInfoModalProps> = ({ name, level }) => {
  return (
    <Modal
      title={name}
      className='w-[600px]'
    >
        <div className='flex flex-col gap-2'>
            <span>Info:</span>
            <span>Nível: {level}</span>
            <div className='flex gap-4'>
                <FilledButton type='button'>Melhorar</FilledButton>
                <FilledButton type='button' className='bg-red-600 hover:bg-red-700'>Demolir</FilledButton>
            </div>
        </div>
    </Modal>
  );
};

export default BuildingInfoModal;
