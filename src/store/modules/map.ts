import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { Map, MapState } from '../types/map';
import mapService from '../../services/map';

export const createMapSlice: StateCreator<MapState> = (set, get) => ({
  map: {
    is_loading_map: false,
    is_loading_map_info: false,
    show_grid: localStorage.getItem('show_grid') === 'false' ? false : true,
    show_minimap: localStorage.getItem('show_minimap') === 'false' ? false : true,
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
    },
    setShowGrid(show_grid: boolean) {
      set(
        produce((state) => {
          state.map.show_grid = show_grid;
          localStorage.setItem('show_grid', show_grid.toString());
        })
      );
    },
    setShowMinimap(show_minimap: boolean) {
      set(
        produce((state) => {
          state.map.show_minimap = show_minimap;
          localStorage.setItem('show_minimap', show_minimap.toString());
        })
      );
    }
  }
});