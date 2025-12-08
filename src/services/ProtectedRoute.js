import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUsuario } from './AuthService';

const ProtectedRoute = ({ roles, children }) => {
  const usuario = getUsuario();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" />; // o página "no autorizado"
  }

  return children;
};

export default ProtectedRoute;
