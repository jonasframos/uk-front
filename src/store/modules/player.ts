import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { Player, PlayerState } from '../types/player';
import playerService from '../../services/player';

export const createPlayerSlice: StateCreator<PlayerState> = (set, get) => ({
  player: {
    current_player: null,
    is_loading_player: false,
    getMe: () => {
      set(
        produce((state) => {
          state.player.is_loading_player = true;
        })
      );

      return playerService.getMe()
      .then((data: Player) => {
        set(
          produce((state) => {
            state.player.current_player = data;
          })
        );
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        set(
          produce((state) => {
            state.player.is_loading_player = false;
          })
        );
      });
    }
  }
});