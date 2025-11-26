export interface Server {
  id: string;
  name: string;
  tag?: string;
  players_count?: number;
  player_info?: {
    points: number;
    cities: number;
    server: string;
    username: string;
  };
}

export interface ServerState {
  server: {
    servers_list: {
      data: Server[];
    },
    selected_server: Server | null;
    is_loading_servers: boolean;
    is_switching_server: boolean;
    getServers: () => void;
    switchServer: (id: string) => Promise<void>;
  };
}
