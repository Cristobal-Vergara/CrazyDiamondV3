import api from './AxiosConfig'; // Usar la instancia centralizada de Axios

const API_URL = '/categorias'; // La baseURL ya está en AxiosConfig

class CategoriaService {

    getAll() {
        return api.get(API_URL);
    }

    getById(id) {
        return api.get(`${API_URL}/${id}`);
    }

    create(categoria) {
        // La autorización debe ser manejada por el backend con el token
        return api.post(API_URL, categoria);
    }

    update(id, categoria) {
        return api.put(`${API_URL}/${id}`, categoria);
    }

    delete(id) {
        return api.delete(`${API_URL}/${id}`);
    }
}

export default new CategoriaService();
