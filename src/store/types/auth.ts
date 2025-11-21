import { NavigateFunction } from "react-router-dom";
import { AdminData } from "./admin";

export type SignInData = {
  email_username: string;
  password: string;
  remember_session: boolean;
};

export type SignUpData = {
  username: string;
  email: string;
  password: string;
  remember_session: boolean;
};

export interface AuthState {
  auth: {
    is_signin_loading: boolean;
    signIn: (signin_data: SignInData, pushModal: any) => void;
    signUp: (signup_data: SignUpData, pushModal: any) => void;
    logout: (navigate?: NavigateFunction) => void;
    fillAdminDataFromToken: (token: string) => AdminData;
  };
}
