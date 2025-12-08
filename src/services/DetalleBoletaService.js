import api from './AxiosConfig'; 

const API_URL = `/boletas`;

class DetalleBoletaService {

    getDetallesByBoletaId(boletaId) {
        return api.get(`${API_URL}/boleta/${boletaId}`, {
            headers: { rol: 'vendedor' }
        });
    }
}

export default new DetalleBoletaService();