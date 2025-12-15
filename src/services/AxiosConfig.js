import axios from 'axios';

// 1. Crear una instancia de Axios
const api = axios.create({
    baseURL: 'https://crazydiamondv4-production.up.railway.app'
});

// 2. Configurar el Interceptor
api.interceptors.request.use(
    (config) => {
        // Buscar el token en el almacenamiento local
        const token = localStorage.getItem('token');
        
        // Si existe, agregarlo al encabezado Authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;