import React, { useState } from 'react';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Electrónica" },
    { id: 2, nombre: "Ropa" },
  ]);

  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (!nombre.trim()) return alert("Nombre requerido");

    if (editId) {
      // Editar categoría
      setCategorias(
        categorias.map(c =>
          c.id === editId ? { ...c, nombre } : c
        )
      );
      setEditId(null);
    } else {
      // Crear categoría
      const newCat = {
        id: categorias.length + 1,
        nombre
      };
      setCategorias([...categorias, newCat]);
    }

    setNombre('');
  };

  const handleEdit = (cat) => {
    setNombre(cat.nombre);
    setEditId(cat.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;
    setCategorias(categorias.filter(c => c.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Categorías </h2>

      <div className="card p-3 my-3">
        <label>Nombre Categoría</label>
        <input
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button
          className="btn btn-primary mt-2"
          onClick={handleAddOrEdit}
        >
          {editId ? "Guardar Cambios" : "Agregar Categoría"}
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.nombre}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ListaCategorias;
