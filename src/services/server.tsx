import { back_api } from '../api/api';
import { handleServiceError } from './handleServiceError';

const serverService = {
  get: async () => {
    try {
      const response = await back_api.get('/v1/server');
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  },
  switch: async (id: string) => {
    try {
      const response = await back_api.patch(`/v1/server/${id}/switch`);
      const data = response.data.data;
      return data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default serverService;
