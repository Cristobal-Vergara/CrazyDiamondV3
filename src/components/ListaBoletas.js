import React, { useState, useEffect } from 'react';

const ListaBoletas = () => {
  // Estado de boletas
  const [boletas, setBoletas] = useState([
    {
      id: 1,
      numero: 'B001',
      fecha: '2024-01-15',
      cliente: 'Juan Pérez',
      total: 1250,
      estado: 'pagada'
    },
    {
      id: 2,
      numero: 'B002',
      fecha: '2024-01-16',
      cliente: 'María López',
      total: 750,
      estado: 'pendiente'
    }
  ]);

  // Formulario
  const [form, setForm] = useState({
    numero: '',
    fecha: new Date().toISOString().split('T')[0],
    cliente: '',
    total: 0,
    estado: 'pendiente'
  });

  const [editando, setEditando] = useState(null);
  const [buscar, setBuscar] = useState('');

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('boletas', JSON.stringify(boletas));
  }, [boletas]);

  useEffect(() => {
    const guardadas = localStorage.getItem('boletas');
    if (guardadas) setBoletas(JSON.parse(guardadas));
  }, []);

  // CRUD funciones
  const guardarBoleta = (e) => {
    e.preventDefault();
    
    if (!form.cliente.trim()) {
      alert('Cliente es requerido');
      return;
    }

    if (editando) {
      // Editar
      setBoletas(boletas.map(b => 
        b.id === editando ? { ...form, id: editando } : b
      ));
    } else {
      // Crear
      const nuevoId = boletas.length > 0 ? Math.max(...boletas.map(b => b.id)) + 1 : 1;
      const nuevoNumero = form.numero || `B${(boletas.length + 1).toString().padStart(3, '0')}`;
      
      setBoletas([...boletas, {
        ...form,
        id: nuevoId,
        numero: nuevoNumero
      }]);
    }

    // Limpiar
    setForm({ numero: '', fecha: new Date().toISOString().split('T')[0], cliente: '', total: 0, estado: 'pendiente' });
    setEditando(null);
  };

  const eliminarBoleta = (id) => {
    if (window.confirm('¿Eliminar boleta?')) {
      setBoletas(boletas.filter(b => b.id !== id));
    }
  };

  const editarBoleta = (boleta) => {
    setForm(boleta);
    setEditando(boleta.id);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setBoletas(boletas.map(b => 
      b.id === id ? { ...b, estado: nuevoEstado } : b
    ));
  };

  // Filtrar boletas
  const boletasFiltradas = boletas.filter(b =>
    b.numero.toLowerCase().includes(buscar.toLowerCase()) ||
    b.cliente.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>🧾 Boletas</h1>

      {/* Formulario */}
      <div style={styles.formCard}>
        <h3>{editando ? 'Editar Boleta' : 'Nueva Boleta'}</h3>
        <form onSubmit={guardarBoleta}>
          <div style={styles.formRow}>
            <input
              type="text"
              placeholder="Número (auto si está vacío)"
              value={form.numero}
              onChange={e => setForm({...form, numero: e.target.value})}
              style={styles.input}
            />
            <input
              type="date"
              value={form.fecha}
              onChange={e => setForm({...form, fecha: e.target.value})}
              style={styles.input}
            />
          </div>
          
          <input
            type="text"
            placeholder="Nombre del cliente *"
            value={form.cliente}
            onChange={e => setForm({...form, cliente: e.target.value})}
            style={styles.input}
            required
          />
          
          <div style={styles.formRow}>
            <input
              type="number"
              placeholder="Total"
              value={form.total}
              onChange={e => setForm({...form, total: parseFloat(e.target.value) || 0})}
              style={styles.input}
            />
            
            <select
              value={form.estado}
              onChange={e => setForm({...form, estado: e.target.value})}
              style={styles.select}
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
              <option value="anulada">Anulada</option>
            </select>
          </div>

          <button type="submit" style={styles.btnGuardar}>
            {editando ? 'Actualizar' : 'Guardar'}
          </button>
          
          {editando && (
            <button 
              type="button" 
              onClick={() => {
                setForm({ numero: '', fecha: new Date().toISOString().split('T')[0], cliente: '', total: 0, estado: 'pendiente' });
                setEditando(null);
              }}
              style={styles.btnCancelar}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Búsqueda */}
      <div style={styles.busqueda}>
        <input
          type="text"
          placeholder="Buscar por número o cliente..."
          value={buscar}
          onChange={e => setBuscar(e.target.value)}
          style={styles.buscarInput}
        />
        <span style={styles.contador}>
          {boletasFiltradas.length} de {boletas.length} boletas
        </span>
      </div>

      {/* Lista de boletas */}
      <div style={styles.lista}>
        {boletasFiltradas.length === 0 ? (
          <p style={styles.sinResultados}>No hay boletas</p>
        ) : (
          boletasFiltradas.map(boleta => (
            <div key={boleta.id} style={styles.boletaCard}>
              <div style={styles.boletaHeader}>
                <div>
                  <strong style={styles.numero}>#{boleta.numero}</strong>
                  <div style={styles.fecha}>{boleta.fecha}</div>
                </div>
                <span style={{
                  ...styles.estado,
                  backgroundColor: 
                    boleta.estado === 'pagada' ? '#28a745' :
                    boleta.estado === 'pendiente' ? '#ffc107' :
                    '#dc3545'
                }}>
                  {boleta.estado}
                </span>
              </div>
              
              <div style={styles.cliente}>{boleta.cliente}</div>
              
              <div style={styles.boletaFooter}>
                <strong style={styles.total}>${boleta.total.toFixed(2)}</strong>
                
                <div style={styles.acciones}>
                  <button 
                    onClick={() => editarBoleta(boleta)}
                    style={styles.btnAccion}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  
                  {boleta.estado === 'pendiente' && (
                    <button 
                      onClick={() => cambiarEstado(boleta.id, 'pagada')}
                      style={{...styles.btnAccion, backgroundColor: '#28a745'}}
                      title="Marcar como pagada"
                    >
                      💰
                    </button>
                  )}
                  
                  <button 
                    onClick={() => eliminarBoleta(boleta.id)}
                    style={{...styles.btnAccion, backgroundColor: '#dc3545'}}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estadísticas */}
      <div style={styles.estadisticas}>
        <div style={styles.stat}>
          <strong>Total:</strong> {boletas.length}
        </div>
        <div style={styles.stat}>
          <strong>Pagadas:</strong> {boletas.filter(b => b.estado === 'pagada').length}
        </div>
        <div style={styles.stat}>
          <strong>Total $:</strong> ${boletas.reduce((sum, b) => sum + b.total, 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

// Estilos simples
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  formCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #ddd'
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  btnGuardar: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  btnCancelar: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  busqueda: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'center'
  },
  buscarInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  contador: {
    fontSize: '14px',
    color: '#666'
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sinResultados: {
    textAlign: 'center',
    padding: '20px',
    color: '#666'
  },
  boletaCard: {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '15px'
  },
  boletaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },
  numero: {
    fontSize: '18px',
    color: '#333'
  },
  fecha: {
    fontSize: '12px',
    color: '#666'
  },
  estado: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'white',
    fontWeight: 'bold'
  },
  cliente: {
    fontSize: '16px',
    marginBottom: '10px'
  },
  boletaFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  total: {
    fontSize: '18px',
    color: '#28a745'
  },
  acciones: {
    display: 'flex',
    gap: '5px'
  },
  btnAccion: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  estadisticas: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  },
  stat: {
    fontSize: '14px'
  }
};

export default ListaBoletas;