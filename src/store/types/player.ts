export interface Player {
  id: string;
  username: string;
  experience: number;
  ranking: number;
  level: number;
  cities: {
    x: number;
    y: number;
  }[];
}

export interface PlayerState {
  player: {
    current_player: Player | null;
    is_loading_player: boolean;
    getMe: () => Promise<void>;
  };
}