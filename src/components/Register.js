import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente'); // Por defecto cliente
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      // Llamada POST para crear usuario
      const response = await fetch('http://34.227.228.64:3000/usuarios', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Solo admin puede crear
        },
        body: JSON.stringify({ nombre, email, password, rol })
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Después de registrar, hacer login automático (opcional)
      const loginData = await login(email, password);
      if (loginData.token) {
        navigate('/productos'); // Redirige a productos
      }

    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
