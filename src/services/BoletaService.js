// src/services/BoletaService.js
import api from './AxiosConfig'; 

const API_URL = `/boletas`;

class BoletaService {

    // Obtener todas las boletas
    getAll() {
        return api.get(API_URL, {
            headers: { rol: 'vendedor' }
        });
    }

    // Obtener detalles de una boleta por ID
    getById(id) {
        return api.get(`${API_URL}/${id}/detalles`, {
            headers: { rol: 'vendedor' }
        });
    }

    // Crear boleta
    create(data) {
        return api.post(API_URL, data, {
            headers: { rol: 'cliente' }
        });
    }
}

export default new BoletaService();
