import axios from "axios";
import { useAuthStore } from "../store/authStore";
import config from "../config/config";

const API = axios.create({
  baseURL: config.base_url,
  withCredentials: true,
});

// Attach access token
API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle refresh token
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = res.data;

        useAuthStore.getState().setAuth({ accessToken, user });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return API(originalRequest);
      } catch (error) {
        console.log(error)
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;
