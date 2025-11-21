import React from 'react';
import produce from 'immer';
import authService from '../../services/auth';
import { back_api } from '../../api/api';
import { StateCreator } from 'zustand';
import { AuthState } from '../types/auth';
import jwtDecode from 'jwt-decode';
import { AdminData } from '../types/admin';
import { StoreState } from '../useStore';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import SelectServerModal from '../../pages/Server/components/SelectServerModal';

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  auth: {
    is_signin_loading: false,
    signIn: (sign_in_data, pushModal) => {
      set(
        produce((state) => {
          state.auth.is_signin_loading = true;
        })
      );

      authService
        .signIn({ email_username: sign_in_data.email_username, password: sign_in_data.password })
        .then((token) => {
          if(sign_in_data.remember_session) {
            localStorage.setItem('token', token);
          } else {
            localStorage.removeItem('token');
            sessionStorage.setItem('token', token);
          }
          get().auth.fillAdminDataFromToken(token);
          if(pushModal) pushModal(React.createElement(SelectServerModal));
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          set(
            produce((state: StoreState) => {
              state.auth.is_signin_loading = false;
            })
          );
        });
    },
    signUp: (sign_up_data, pushModal) => {
      set(
        produce((state) => {
          state.auth.is_signin_loading = true;
        })
      );

      authService
        .signUp({ email: sign_up_data.email, password: sign_up_data.password, username: sign_up_data.username })
        .then((token) => {
          if(sign_up_data.remember_session) {
            localStorage.setItem('token', token);
          } else {
            localStorage.removeItem('token');
            sessionStorage.setItem('token', token);
          }
          get().auth.fillAdminDataFromToken(token);
          if(pushModal) pushModal(React.createElement(SelectServerModal));
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          set(
            produce((state: StoreState) => {
              state.auth.is_signin_loading = false;
            })
          );
        });
    },
    logout: (navigate?: NavigateFunction) => {
      localStorage.clear();
      sessionStorage.clear();
      back_api.defaults.headers.Authorization = '';
      
      if(navigate) navigate('/')
      else window.location.href = '/';
    },
    fillAdminDataFromToken: (token: string) => {
      const adminData: AdminData = jwtDecode(token);
      const section_id = sessionStorage.getItem('section_id');
      const section_name = sessionStorage.getItem('section_name');

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
