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
  }
};

export default cityService;
