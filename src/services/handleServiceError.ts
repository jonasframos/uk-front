import axios from "axios";

const LOGIN_ERRORS: Record<number, string> = {
  1007: "Email ou senha incorretos",
};

const PERMISSION_ERRORS: Record<number, string> = {
  1013: "Você não possui permissão para realizar esta ação",
};

const PROFILE_ERRORS: Record<number, string> = {
  1022: "Senha de usuário incorreta",
};

const DUPLICATE_KEY_ERRORS: Record<string, string> = {
  "email": "Email já cadastrado",
  "cpf": "CPF já cadastrado",
  "cnh": "CNH já cadastrado",
  "registration": "Matrícula já cadastrada",
  "rg": "RG já cadastrado",
  "tag": "Placa já cadastrada",
};

const UNEXPECTED_ERROR = "Ocorreu um erro inesperado";

const ERROR_MESSAGES: Record<number, string> = {
  ...LOGIN_ERRORS,
  ...PERMISSION_ERRORS,
  ...DUPLICATE_KEY_ERRORS,
  ...PROFILE_ERRORS
};

export const handleServiceError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const DUPLICATED_KEYS_CODE = 1011;
    if (error?.response?.data?.response_code === DUPLICATED_KEYS_CODE) {
      throw Error(
        ERROR_MESSAGES[error?.response?.data?.error?.field] ?? error?.response?.data["message"]
      );
    }
    const MACRO_CHECKED_FAILED_REASON_CODE = 1023;
    if (error?.response?.data?.response_code === MACRO_CHECKED_FAILED_REASON_CODE) {
      throw Error(
        error?.response?.data?.message ?? error?.response?.data["message"]
      );
    }
    throw Error(
      ERROR_MESSAGES[error?.response?.data?.response_code] ?? error?.response?.data["message"]
    );
  }
  throw Error(error.response.data["message"]);
};
