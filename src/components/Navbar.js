import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Crazy Diamond</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">

          {/* Mostrar solo si hay usuario logeado */}
          {usuario && (
            <>
              {/* Productos: Todos los roles */}
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>

              {/* Categorías y Boletas: Admin y Vendedor */}
              {(usuario.rol === 'admin' || usuario.rol === 'vendedor') && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categorias">Categorías</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/boletas">Boletas</Link>
                  </li>
                </>
              )}

              {/* Usuarios: Solo Admin */}
              {usuario.rol === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/usuarios">Usuarios</Link>
                </li>
              )}
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {/* Si no hay usuario logeado */}
          {!usuario && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

          {/* Si hay usuario logeado */}
          {usuario && (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  Bienvenido {usuario.nombre} ({usuario.rol}) - {usuario.email}
                </span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
