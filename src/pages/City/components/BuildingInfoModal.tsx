import Modal from '../../../components/Modal/Modal';
import FilledButton from '../../../components/Buttons/FilledButton';
import CastleInfoModalContent from '../../Buildings/components/CastleInfoModal';
import StrongholdInfoModalContent from '../../Buildings/components/StrongholdInfoModal';
import { useStore } from "../../../store/useStore";
import Countdown from '../../../components/Countdown/Countdown';
import StorageInfoModalContent from '../../Buildings/components/StorageModal';
import LumberMillInfoModalContent from '../../Buildings/components/LumberMillInfoModal';
import FarmInfoModalContent from '../../Buildings/components/FarmInfoModal';
import QuarryInfoModalContent from '../../Buildings/components/QuarryInfoModal';
import BlacksmithInfoModalContent from '../../Buildings/components/BlacksmithInfoModal';
import MarketInfoModalContent from '../../Buildings/components/MarketInfoModal';

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
        next_level: boolean;
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
    next_level,
    can_build,
    current_level = 0
  } = data;

  let content;
  switch(type) {
    case 'CASTLE':
      content = <CastleInfoModalContent />;
      break;
    case 'STRONGHOLD':
      content = <StrongholdInfoModalContent />;
      break;
    case 'BLACKSMITH':
      content = <BlacksmithInfoModalContent />;
      break;
    case 'STORAGE':
      content = <StorageInfoModalContent />;
      break;
    case 'LUMBERMILL':
      content = <LumberMillInfoModalContent />;
      break;
    case 'FARM':
      content = <FarmInfoModalContent />;
      break;
    case 'QUARRY':
      content = <QuarryInfoModalContent />;
      break;
    case 'MARKET':
      content = <MarketInfoModalContent />;
      break;
    default:
      content = null;
  }

  const selected_city = useStore((state) => state.city.selected_city);
  const build = useStore((state) => state.city.build);
  const cancelBuild = useStore((state) => state.city.cancelBuild);
  const can_build_parsed = Object.values(can_build ?? {}).every(v => v === true);
        
  const handleBuild = (building_type: string, level: number) => {
      if(!selected_city) return;
      build(selected_city.id, building_type, level);
  }
  const handleCancelBuild = (id: string) => {
      if(!selected_city) return;
      cancelBuild(selected_city.id, id);
  }

  let cant_build_message = '';
  if(can_build?.resources === false) cant_build_message = 'Recursos insuficientes.';
  else if(can_build?.builders === false) cant_build_message = 'Todos os construtores estão ocupados.';
  else if(can_build?.free_queue === false) cant_build_message = 'A construção já está na fila.';
  else if(can_build?.next_level === false) cant_build_message = 'Edifício já construído';
  
  let finishes_at = '0';
  if(can_build?.free_queue === false) {
    finishes_at = selected_city?.builders?.queue?.find(q => q.type === type && q.level === next_level)?.finishes_at ?? '0';
  }
  
  return (
    <Modal
      title={type ?? ''}
      className='w-[1000px]'
    >
        <div className='flex flex-col gap-2'>
            {
              can_build?.free_queue === false && 
              <div className="bg-gray-200 border-2 border-black rounded-lg flex flex-col items-center justify-center p-5">
                  <span>Construindo {type} Nível {next_level}</span>
                  <span>Termina em: {new Date(finishes_at).toLocaleString()}</span>
                  <span>Tempo Restante: <Countdown key={finishes_at.toString()} finishes_at={finishes_at.toString()} /></span>
                  <FilledButton
                    type="button"
                    onClick={() => handleCancelBuild(selected_city?.builders?.queue?.find(q => q.type === type && q.level === next_level)?.id ?? '')}
                  >
                    Cancelar
                  </FilledButton>
              </div>
            }
            {
                can_build?.free_queue && can_build_parsed ? 
                    <FilledButton type='button' onClick={() => handleBuild(type ?? '', data.next_level || 0)}>
                        {data.next_level === 1 ? 'Construir' : `Nível ${(data.next_level || 0).toString()}`}
                    </FilledButton> 
                : <span>{cant_build_message}</span>
            }
            {
              current_level >= 1 &&
              <div className='flex justify-end mt-1'>
                {content}
              </div>
            }
        </div>
    </Modal>
  );
};

export default BuildingInfoModal;
