import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsuarioService from "../services/UsuarioService";

const UsuarioComponent = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "usuario",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            UsuarioService.getUsuarioById(id).then((response) => {
                setUsuario({
                    ...response.data,
                    password: ""
                });
            });
        }
    }, [id]);

const handleSubmit = (e) => {
    e.preventDefault();

    let dataToSend = { ...usuario };

    if (id && dataToSend.password === "") {
        delete dataToSend.password;
    }

    if (id) {
        // === ACTUALIZAR ===
        UsuarioService.updateUsuario(id, dataToSend)
            .then(() => {
                alert("Usuario actualizado correctamente");
                navigate("/usuarios");
            })
            .catch((err) => {
                console.error("ERROR AL ACTUALIZAR:", err.response?.data || err);
                alert("Error al actualizar (mira consola)");
            });
    } else {
        // === CREAR ===
        UsuarioService.createUsuario(dataToSend)
            .then(() => {
                alert("Usuario creado correctamente");
                navigate("/usuarios");
            })
            .catch((err) => {
                console.error("ERROR AL CREAR:", err.response?.data || err);
                alert("Error al crear (mira consola)");
            });
    }
};



    return (
        <div className="container mt-5">
            <h2>{id ? "Editar Usuario" : "Crear Usuario"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={usuario.nombre}
                    onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                />

                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={usuario.email}
                    onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                />

                {!id && (
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Contraseña"
                        value={usuario.password}
                        onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                    />
                )}

                <select
                    className="form-control mb-2"
                    value={usuario.rol}
                    onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Cliente">Cliente</option>
                    <option value="usuario">Usuario</option>
                </select>

                <button className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default UsuarioComponent;
