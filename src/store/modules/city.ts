import produce from 'immer';
import { StateCreator } from 'zustand';
import { toast } from 'react-toastify';
import { City, CityState } from '../types/city';
import cityService from '../../services/city';

export const createCitySlice: StateCreator<CityState> = (set, get) => ({
  city: {
    is_loading_city: false,
    is_sending_building_to_queue: false,
    is_sending_recruit_to_queue: false,
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
    },
    cancelBuild(city_id: string, queue_id: string) {
      set(
        produce((state) => {
          state.city.is_sending_building_to_queue = true;
        })
      );
      try {
        cityService.cancelBuild(city_id, queue_id).then(() => {
          toast.success('Construção interrompida com sucesso!');
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
    },
    recruit(city_id: string, type: string, amount: number) {
      set(
        produce((state) => {
          state.city.is_sending_recruit_to_queue = true;
        })
      );
      try {
        cityService.recruit(city_id, type, amount).then(() => {
          toast.success('Recrutamento iniciado com sucesso!');
        });
      } catch (error: any) {
        toast.error(error.message);
      }
      finally {
        set(
          produce((state) => {
            state.city.is_sending_recruit_to_queue = false;
          })
        );
      }
    },
    cancelRecruit(city_id: string, queue_id: string) {
      set(
        produce((state) => {
          state.city.is_sending_recruit_to_queue = true;
        })
      );
      try {
        cityService.cancelRecruit(city_id, queue_id).then(() => {
          toast.success('Recrutamento interrompido com sucesso!');
        });
      } catch (error: any) {
        toast.error(error.message);
      }
      finally {
        set(
          produce((state) => {
            state.city.is_sending_recruit_to_queue = false;
          })
        );
      }
    }
  }
});