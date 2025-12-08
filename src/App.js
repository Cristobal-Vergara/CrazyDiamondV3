// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';
import Navbar from './components/Navbar';

import ListaBoletas from './components/ListaBoletas';

import ListaCategorias from './components/ListaCategorias';


import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

import ListaProductos from './components/ListaProductos';
import ProductoComponent from './components/ProductoComponent';

import ListaUsuarios from './components/ListaUsuarios';
import UsuarioComponent from './components/UsuarioComponent';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* AUTENTICACIÓN */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* DASHBOARD neutro */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['admin', 'vendedor', 'cliente']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* PRODUCTOS */}
          <Route
            path="/productos"
            element={
              <ProtectedRoute roles={['admin', 'vendedor', 'cliente']}>
                <ListaProductos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-producto"
            element={
              <ProtectedRoute roles={['admin']}>
                <ProductoComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-producto/:id"
            element={
              <ProtectedRoute roles={['admin']}>
                <ProductoComponent />
              </ProtectedRoute>
            }
          />

          {/* USUARIOS - solo admin */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute roles={['admin']}>
                <ListaUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios/nuevo"
            element={
              <ProtectedRoute roles={['admin']}>
                <UsuarioComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios/editar/:id"
            element={
              <ProtectedRoute roles={['admin']}>
                <UsuarioComponent />
              </ProtectedRoute>
            }
          

          />
            {/* CATEGORÍAS */}
            <Route path="/categorias" element={
              <ProtectedRoute roles={['admin']}>
                <ListaCategorias />
              </ProtectedRoute>
            } />

            {/* BOLETAS */}
            <Route path="/boletas" element={
              <ProtectedRoute roles={['admin']}>
                <ListaBoletas />
              </ProtectedRoute>
            } />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;