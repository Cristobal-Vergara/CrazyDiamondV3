import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriaService from '../services/CategoriaService';

const CategoriaComponent = () => {
    const [nombre, setNombre] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateCategoria = (e) => {
        e.preventDefault();

        const categoria = { nombre };

        if (id) {
            // actualizar
            CategoriaService.updateCategoria(id, categoria)
                .then(() => navigate('/categorias'))
                .catch(error => console.log(error));
        } else {
            // crear
            CategoriaService.createCategoria(categoria)
                .then(() => navigate('/categorias'))
                .catch(error => console.log(error));
        }
    };

    useEffect(() => {
        if (id) {
            CategoriaService.getCategoriaById(id)
                .then(response => {
                    setNombre(response.data.nombre);
                })
                .catch(error => console.log(error));
        }
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="card col-md-6 offset-md-3">
                <h2 className="text-center">
                    {id ? "Editar" : "Agregar"} Categoría
                </h2>

                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-success"
                            onClick={saveOrUpdateCategoria}
                        >
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriaComponent;
