import { back_api } from '../api/api';
import { handleServiceError } from './handleServiceError';

const mapService = {
  get: async () => {
    try {
      const response = await back_api.get('/v1/map');
      const data = response.data.data;

      return data;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default mapService;
