// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuario } from '../services/AuthService';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = getUsuario();

  if (!usuario) return null; // No mostrar nada si no hay usuario logeado

  const { rol } = usuario;

  return (
    <div className="container mt-5">
      <h2>Bienvenido, {usuario.nombre}</h2>
      <p>Seleccione una opción del menú:</p>

      <div className="d-flex flex-wrap mt-4 gap-3">
        {/* Todos los roles pueden ver Productos */}
        <button className="btn btn-primary" onClick={() => navigate('/productos')}>
          Productos
        </button>

        {/* Admin y Vendedor pueden ver Categorías */}
        {(rol === 'admin' || rol === 'vendedor') && (
          <button className="btn btn-secondary" onClick={() => navigate('/categorias')}>
            Categorías
          </button>
        )}

        {/* Admin y Vendedor pueden ver Boletas */}
        {(rol === 'admin' || rol === 'vendedor') && (
          <button className="btn btn-success" onClick={() => navigate('/boletas')}>
            Boletas
          </button>
        )}

        {/* Solo Admin puede ver Usuarios */}
        {rol === 'admin' && (
          <button className="btn btn-warning" onClick={() => navigate('/usuarios')}>
            Usuarios
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
