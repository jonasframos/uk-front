import produce from 'immer';
import { StateCreator } from 'zustand';
import { 
  Server, 
  ServerState
} from '../types/server';
import serverService from '../../services/server';
import { toast } from 'react-toastify';

export const createServerSlice: StateCreator<ServerState> = (set, get) => ({
  server: {
    servers_list: {
      data: []
    },
    is_loading_servers: false,
    is_switching_server: false,
    selected_server: null,
    getServers: () => {
      set(
        produce((state) => {
          state.server.is_loading_servers = true;
        })
      );

      serverService.get()
      .then((data: Server[]) => {
        set(
          produce((state) => {
            state.server.servers_list.data = data;
          })
        );
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        set(
          produce((state) => {
            state.server.is_loading_servers = false;
          })
        );
      });
    },
    switchServer: (id: string) => {
      set(
        produce((state) => {
          state.server.is_switching_server = true;
        })
      );

      const server_data = get().server.servers_list.data.find((server) => server._id === id);

      serverService.switch(id)
      .then((data) => {
        const token = data.token;
        set(
          produce((state) => {
            state.server.selected_server = server_data;
            state.auth.fillAdminDataFromToken(token);
          })
        );
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        set(
          produce((state) => {
            state.server.is_switching_server = false;
          })
        );
      });
    }
  },
});