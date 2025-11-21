import { NavigateFunction } from "react-router-dom";
import { AdminData } from "./admin";

export type SignInData = {
  cpf: string;
  password: string;
  rememberSession: boolean;
};

export interface AuthState {
  auth: {
    isSignInLoading: boolean;
    signIn: (signInData: SignInData, navigate: NavigateFunction) => void;
    logout: (navigate?: NavigateFunction) => void;
    fillAdminDataFromToken: (token: string) => AdminData;
  };
}
