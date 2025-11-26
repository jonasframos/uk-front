import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { Map, MapState } from '../types/map';
import mapService from '../../services/map';

export const createMapSlice: StateCreator<MapState> = (set, get) => ({
  map: {
    is_loading_map: false,
    is_loading_map_info: false,
    selected_map: null,
    setLoadingMap(is_loading: boolean) {
      set(
        produce((state) => {
          state.map.is_loading_map = is_loading;
        })
      );
    },
    getMap() {
      set(
        produce((state) => {
          state.map.is_loading_map_info = true;
        })
      );

      try {
        mapService.get().then((data: Map) => {
          set(
            produce((state) => {
              state.map.selected_map = data;
            })
          );
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        set(
          produce((state) => {
            state.map.is_loading_map_info = false;
          })
        );
      }
    }
  }
});