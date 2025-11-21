import { api_public } from '../api/api';
import { handleServiceError } from './handleServiceError';

type SignInRequestBody = { email_username: string; password: string };
type SignUpRequestBody = { username: string; email: string; password: string };

const authService = {
  signIn: async (credentials: SignInRequestBody) => {
    try {
      const response = await api_public.post('/v1/auth/login', credentials);
      const data = response.data.data;

      return data.token;
    } catch (error) {
      handleServiceError(error);
    }
  },
  signUp: async (credentials: SignUpRequestBody) => {
    try {
      const response = await api_public.post('/v1/auth/signup', credentials);
      const data = response.data.data;

      return data.token;
    } catch (error) {
      handleServiceError(error);
    }
  }
};

export default authService;
