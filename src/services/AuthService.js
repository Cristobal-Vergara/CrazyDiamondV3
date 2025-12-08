export const login = async (email, password) => {
  const response = await fetch('http://34.227.228.64:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const getToken = () => localStorage.getItem('token');
export const getUsuario = () => JSON.parse(localStorage.getItem('usuario'));
