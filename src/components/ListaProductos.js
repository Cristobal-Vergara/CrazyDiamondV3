import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../services/ProductoService';
import { AuthContext } from '../services/AuthContext';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      const res = await ProductoService.getAllProductos();
      setProductos(res.data);
    } catch (err) {
      console.error('Error cargando productos:', err);
      alert('Error al cargar productos');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEditar = (id) => {
    navigate(`/edit-producto/${id}`);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await ProductoService.deleteProducto(id);
      alert('Producto eliminado');
      cargarProductos();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Productos</h2>

      {/* Botón agregar producto solo para admin */}
      {usuario?.rol === 'admin' && (
        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => navigate('/add-producto')}>
            ➕ Agregar Producto
          </button>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            {usuario?.rol === 'admin' && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              {usuario?.rol === 'admin' && (
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(p.id)}>✏️ Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.id)}>🗑️ Eliminar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;
