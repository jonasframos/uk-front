export interface Player {
  username: string;
  points: number;
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