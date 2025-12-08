// ProductoComponent.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductoService from '../services/ProductoService';
import { AuthContext } from '../services/AuthContext';

const ProductoComponent = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar producto si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      ProductoService.getProductoById(id)
        .then(res => {
          setNombre(res.data.nombre);
          setPrecio(res.data.precio.toString());
        })
        .catch(err => {
          console.error('Error al cargar producto:', err.response?.data || err.message);
          alert('Error al cargar producto');
          navigate('/productos');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, navigate]);

  // Guardar o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !precio) {
      setError('Nombre y precio son requeridos');
      return;
    }

    const producto = { nombre: nombre.trim(), precio: parseFloat(precio) };
    console.log('Enviando producto:', producto);

    try {
      setLoading(true);
      let res;
      if (isEdit) {
        res = await ProductoService.updateProducto(id, producto);
        console.log('Producto actualizado:', res.data);
        alert('✅ Producto actualizado correctamente');
      } else {
        res = await ProductoService.createProducto(producto);
        console.log('Producto creado:', res.data);
        alert('✅ Producto creado correctamente');
      }
      navigate('/productos');
    } catch (err) {
      console.error('Error al guardar producto:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error al guardar producto');
      alert(`❌ ${err.response?.data?.error || 'Error al guardar producto'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return null; // Evita renderizar si no hay usuario

  return (
    <div className="container mt-5">
      <h2>{isEdit ? '✏️ Editar Producto' : '➕ Agregar Producto'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre *</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label>Precio *</label>
          <input
            type="number"
            className="form-control"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            step="0.01"
            min="0.01"
            disabled={loading}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? '⏳ Guardando...' : isEdit ? '💾 Guardar cambios' : '➕ Agregar Producto'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/productos')}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductoComponent;
