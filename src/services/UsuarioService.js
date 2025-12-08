// UsuarioService.js
import api from './AxiosConfig';

class UsuarioService {

    // Obtener todos los usuarios
    getAllUsuarios() {
        return api.get('/usuarios');
    }

    // Crear usuario
    createUsuario(usuario) {
        return api.post('/usuarios', usuario);
    }

    // Obtener usuario por ID
    getUsuarioById(id) {
        return api.get(`/usuarios/${id}`);
    }

    // Actualizar usuario
    updateUsuario(id, usuario) {
        return api.put(`/usuarios/${id}`, usuario);
    }

    // Eliminar usuario
    deleteUsuario(id) {
        return api.delete(`/usuarios/${id}`);
    }
}

export default new UsuarioService();
