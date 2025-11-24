import { back_api } from '../api/api';
import { handleServiceError } from './handleServiceError';

const playerService = {
  create: async () => {
    try {
      const response = await back_api.post('/v1/player');
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default playerService;
