import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor para añadir las credenciales automáticamente
api.interceptors.request.use(config => {
    const auth = localStorage.getItem('auth_token'); // El string "Basic b3J...="
    if (auth) {
        config.headers.Authorization = auth;
    }
    return config;
});

export default api;