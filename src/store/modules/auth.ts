import produce from "immer";
import authService from "../../services/authService";
import { chartsAPI, fleetAPI, payRollAPI, trackingAPI, userAPI, reportAPI } from "../../api/api";
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
          if(adminData.position.type === "MASTER") {
            navigate(ROUTES.DASHBOARD.PATH, { state: { openChangeCompanyModal: true } });
          }
          else if((adminData.position.type === "DRIVER") || (adminData.position.type === "EMPLOYEE")) {
            toast.error("Usuário sem permissão de acesso");
            get().auth.logout(navigate);
            return ;
          } else if(adminData.position.type === "MANAGER") {
            navigate(ROUTES.DASHBOARD.PATH);
          }
          else {
            navigate(ROUTES.COLLABORATORS.PATH);
          }
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
      userAPI.defaults.headers.Authorization = "";
      fleetAPI.defaults.headers.Authorization = "";
      payRollAPI.defaults.headers.Authorization = "";
      chartsAPI.defaults.headers.Authorization = "";
      
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
      userAPI.defaults.headers.Authorization = `Bearer ${token}`;
      fleetAPI.defaults.headers.Authorization = `Bearer ${token}`;
      payRollAPI.defaults.headers.Authorization = `Bearer ${token}`;
      chartsAPI.defaults.headers.Authorization = `Bearer ${token}`;
      trackingAPI.defaults.headers.Authorization = `Bearer ${token}`;
      reportAPI.defaults.headers.Authorization = `Bearer ${token}`;
      return adminData;
    },
  },
});
