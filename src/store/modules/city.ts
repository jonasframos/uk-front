import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { City, CityState } from '../types/city';
import cityService from '../../services/city';

export const createCitySlice: StateCreator<CityState> = (set, get) => ({
  city: {
    is_loading_city: false,
    is_sending_building_to_queue: false,
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
    },
    build(city_id: string, building_type: string, level: number) {
      set(
        produce((state) => {
          state.city.is_sending_building_to_queue = true;
        })
      );
      try {
        cityService.build(city_id, building_type, level).then(() => {
          toast.success('Construção iniciada com sucesso!');
        });
      } catch (error: any) {
        toast.error(error.message);
      }
      finally {
        set(
          produce((state) => {
            state.city.is_sending_building_to_queue = false;
          })
        );
      }
    }
  }
});