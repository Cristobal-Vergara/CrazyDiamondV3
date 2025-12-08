import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUsuario, login as loginService, logout as logoutService } from './AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = getUsuario();
    if (u) setUsuario(u);
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    if (data.token) setUsuario(data.usuario);
    return data;
  };

  const logout = () => {
    logoutService();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
