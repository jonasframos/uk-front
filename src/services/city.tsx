import { back_api } from '../api/api';
import { handleServiceError } from './handleServiceError';

const cityService = {
  get: async (id: string) => {
    try {
      const response = await back_api.get(`/v1/city/${id}`);
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  build: async (
    city_id: string,
    building_type: string,
    level: number
  ) => {
    try {
      const response = await back_api.post(`/v1/city/${city_id}/build`, {
        building_type,
        level
      });
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  cancelBuild: async (
    city_id: string,
    queue_id: string,
  ) => {
    try {
      const response = await back_api.post(`/v1/city/${city_id}/build/cancel`, {
        queue_id
      });
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  recruit: async (
    city_id: string,
    type: string,
    amount: number
  ) => {
    try {
      const response = await back_api.post(`/v1/city/${city_id}/recruit`, {
        type,
        amount
      });
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  cancelRecruit: async (
    city_id: string,
    queue_id: string,
  ) => {
    try {
      const response = await back_api.post(`/v1/city/${city_id}/recruit/cancel`, {
        queue_id
      });
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default cityService;
