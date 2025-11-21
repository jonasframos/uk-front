import { back_api } from '../api/api';
import { handleServiceError } from './handleServiceError';

const playerService = {
  create: async () => {
    try {
      const response = await back_api.get('/v1/server');
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default serverService;
