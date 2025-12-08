import React, { useState, useEffect } from 'react';
import UsuarioService from '../services/UsuarioService';
import { useNavigate } from "react-router-dom";


const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
        UsuarioService.getAllUsuarios().then((res) => {
            setUsuarios(res.data);
        });
    };

    const eliminarUsuario = (id) => {
        UsuarioService.deleteUsuario(id).then(() => {
            cargarUsuarios();
        });
    };

    return (
        <div className="container mt-4">
            <h2>Usuarios</h2>
            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/usuarios/nuevo")}
            >
                Nuevo Usuario
            </button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.correo}</td>
                            <td>{u.rol}</td>

                            <td>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => navigate(`/usuarios/editar/${u.id}`)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarUsuario(u.id)}
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

export default ListaUsuarios;
