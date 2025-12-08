import Modal from '../../../components/Modal/Modal';
import FilledButton from '../../../components/Buttons/FilledButton';
import CastleInfoModalContent from '../../Buildings/components/CastleInfoModal';

export interface BuildingInfoModalProps {
  data: {
    type?: string;
    current_level?: number;
    maxed_out?: boolean;
    next_level?: number;
    can_build?: {
        resources: boolean;
        builders: boolean;
        free_queue: boolean;
    };
    build_time?: number;
    build_cost?: {
        wood: number;
        stone: number;
        gold: number;
        food: number;
    };
    can_build_at?: string | null;
  }
}

const BuildingInfoModal: React.FC<BuildingInfoModalProps> = ({ data }) => {
  const {
    type,
    maxed_out,
    current_level,
    next_level,
    build_time,
    build_cost,
    can_build_at = null,
  } = data;

  let content;
  switch(type) {
    case 'CASTLE':
      content = <CastleInfoModalContent />;
      break;
    default:
      content = null;
  }

  return (
    <Modal
      title={type ?? ''}
      className='w-[1000px]'
    >
        <div className='flex flex-col gap-2'>
            <span>Info:</span>
            <span>Nível: {current_level} {maxed_out ? '(Maxed Out)' : ''}</span>
            { next_level && <span>Próximo Nível: {next_level}</span> }
            { build_time && <span>Tempo de Construção: {build_time} segundos</span> }
            { build_cost && 
                <div>
                    <span>Custo de Construção:</span>
                    <ul className='list-disc list-inside'>
                        <li>Madeira: {build_cost.wood}</li>
                        <li>Pedra: {build_cost.stone}</li>
                        <li>Ouro: {build_cost.gold}</li>
                        <li>Comida: {build_cost.food}</li>
                    </ul>
                </div>
            }
            { can_build_at && <span>Pode ser construído em: {can_build_at}</span> }
            <div className='flex justify-end mt-1'>
              {content}
            </div>
        </div>
    </Modal>
  );
};

export default BuildingInfoModal;
