import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await authLogin(email, password);
      if (data.token) {
        navigate('/dashboard'); // <-- Redirige al Dashboard
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
