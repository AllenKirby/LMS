import axios from "axios";
import store, { RootState } from "../redux/store";
import { UserState } from "../redux/UserRedux"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const state: RootState = store.getState(); 
  const user = state.user as UserState | null;

  if (user?.access_token) {
    config.headers["Authorization"] = `Bearer ${user.access_token}`;
  }
  if (user?.csrf_token) {
    config.headers["X-CSRFToken"] = user.csrf_token;
  }

  return config;
});

export default api;
