import { api_public } from "../api/api";
import { handleServiceError } from "./handleServiceError";

type SignInRequestBody = { cpf: string; password: string };

const authService = {
  signIn: async (credentials: SignInRequestBody) => {
    try {
      const response = await api_public.post("/v1/auth/login", credentials);
      const data = response.data.data;

      return data.token;
    } catch (error) {
      handleServiceError(error);
    }
  },
};

export default authService;
