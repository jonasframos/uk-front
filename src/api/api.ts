import axios, { AxiosError } from 'axios';

const axiosInstanceParams = (base_url: string | undefined) => {
  if (!base_url) return;
  return {
    baseURL: base_url,
    headers: {
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
      "Content-Type": "application/json",
      "accept-language": "pt-br",
    },
  };
};

export let back_api = axios.create(
  axiosInstanceParams(process.env?.REACT_APP_API_URL)
);

export const api_public = axios.create({
  baseURL: process.env?.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "accept-language": "pt-br",
  },
});

const errorInterceptor = (error: AxiosError) => {
  // Token expired
  if (error?.response && error?.response?.status === 401) {
    localStorage.clear();
    window.location.href = '/';
    return;
  }

  return Promise.reject(error);
};

back_api.interceptors.response.use((response) => response, errorInterceptor);