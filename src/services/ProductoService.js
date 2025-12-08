import api from './AxiosConfig';

class ProductoService {
  getAllProductos() {
    return api.get('/productos');
  }

  getProductoById(id) {
    return api.get(`/productos/${id}`);
  }

  createProducto(producto) {
    return api.post('/productos', {
      nombre: producto.nombre,
      precio: parseFloat(producto.precio)
    });
  }

  updateProducto(id, producto) {
    return api.put(`/productos/${id}/simple`, {
      nombre: producto.nombre,
      precio: parseFloat(producto.precio)
    });
  }

  deleteProducto(id) {
    return api.delete(`/productos/${id}`);
  }
}

export default new ProductoService();
