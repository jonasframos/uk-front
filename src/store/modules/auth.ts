import produce from "immer";
import authService from "../../services/authService";
import { back_api } from "../../api/api";
import { StateCreator } from "zustand";
import { ROUTES } from "../../routes/routes";
import { AuthState } from "../types/auth";
import jwtDecode from "jwt-decode";
import { AdminData } from "../types/admin";
import { StoreState } from "../useStore";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  auth: {
    isSignInLoading: false,
    signIn: (signInData, navigate) => {
      set(
        produce((state) => {
          state.auth.isSignInLoading = true;
        })
      );

      authService
        .signIn({ cpf: signInData.cpf, password: signInData.password })
        .then((token) => {
          if(signInData.rememberSession) {
            localStorage.setItem("token", token);
          } else {
            localStorage.removeItem("token");
            sessionStorage.setItem("token", token);
          }
          const adminData = get().auth.fillAdminDataFromToken(token);
          navigate(ROUTES.OVERVIEW.PATH);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          set(
            produce((state: StoreState) => {
              state.auth.isSignInLoading = false;
            })
          );
        });
    },
    logout: (navigate?: NavigateFunction) => {
      localStorage.clear();
      sessionStorage.clear();
      back_api.defaults.headers.Authorization = "";
      
      if(navigate) navigate('/')
      else window.location.href = "/";
    },
    fillAdminDataFromToken: (token: string) => {
      const adminData: AdminData = jwtDecode(token);
      const section_id = sessionStorage.getItem("section_id");
      const section_name = sessionStorage.getItem("section_name");

      set(
        produce((state: StoreState) => {
          state.admin.data = {
            ...adminData,
            ...(section_id && section_name) && {
              section: {
                _id: section_id,
                name: section_name,
              }
            }
          }
        })
      );
      back_api.defaults.headers.Authorization = `Bearer ${token}`;
      return adminData;
    },
  },
});
