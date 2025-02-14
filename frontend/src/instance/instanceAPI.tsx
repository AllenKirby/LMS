import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})

api.interceptors.request.use(async (config) => {
    const csrfRes = await api.get("/csrf-token/");
    config.headers['X-CSRFToken'] = csrfRes.data.csrfToken;
    return config
})

export default api;