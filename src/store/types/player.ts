export interface Player {
  _id: string;
  name: string;
}

export interface PlayerState {
  player: {
    current_player: Player | null;
    is_creating_player: boolean;
    createPlayer: () => Promise<void>;
  };
}
