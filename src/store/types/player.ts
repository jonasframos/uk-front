export interface Player {
  username: string;
  points: number;
  cities: string[];
}

export interface PlayerState {
  player: {
    current_player: Player | null;
    is_creating_player: boolean;
    createPlayer: () => Promise<void>;
  };
}