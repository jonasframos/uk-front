import { useEffect } from 'react';
import Modal from '../../../components/Modal/Modal';
import { useStore } from '../../../store/useStore';
import ServerSelectionDataTable from '../../../components/Datatables/ServerSelectionDatatable';
import FilledButton from '../../../components/Buttons/FilledButton';
import { Server } from '../../../store/types/server';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';

const SelectServerModal: React.FC<{}> = () => {
  const navigate = useNavigate();
  const servers = useStore(
    (state) => state.server.servers_list.data
  );
  const getServers = useStore(
    (state) => state.server.getServers
  );
  const createPlayer = useStore(
    (state) => state.player.createPlayer
  );
  const switchServer = useStore(
    (state) => state.server.switchServer
  );
  const handleSwitchServer = async (server: Server) => {
    await switchServer(server.id);
    if(!server.player_info) await createPlayer();
    useStore.getState().modal.clearModals();
    navigate(ROUTES.MAP.PATH);
  };

  useEffect(() => {
    getServers();
  }, []);

  return (
    <Modal
      title='Seleção de Servidor'
      className='w-[800px]'
    >
      <div className='flex flex-col'>
        <ServerSelectionDataTable 
          data={servers} 
          onSwitchServer={handleSwitchServer}
        />
        <div className="flex justify-end">
          <FilledButton
            className='w-[100px] mt-[30px] mb-[10px]'
          >
            Logout
          </FilledButton>
        </div>
      </div>
    </Modal>
  );
};

export default SelectServerModal;