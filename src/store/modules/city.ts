import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { City, CityState } from '../types/city';
import cityService from '../../services/city';

export const createCitySlice: StateCreator<CityState> = (set, get) => ({
  city: {
    is_loading_city: false,
    selected_city: null,
    setLoadingCity(is_loading: boolean) {
      set(
        produce((state) => {
          state.city.is_loading_city = is_loading;
        })
      );
    },
    getCity(id: string) {
      set(
        produce((state) => {
          state.city.is_loading_city = true;
        })
      );

      try {
        cityService.get(id).then((data: City) => {
          set(
            produce((state) => {
              state.city.selected_city = data;
            })
          );
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        set(
          produce((state) => {
            state.city.is_loading_city = false;
          })
        );
      }
    }
  }
});