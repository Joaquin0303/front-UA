import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalAddSwitch from '../components/Modal-add-switch'

import '../styles/abm.css';

import { FaPlus } from 'react-icons/fa';

export const Permisos = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [roles, setRoles] = useState([]);

    const handleModalSubmit = (nombreRol) => {
        // Agrega el nuevo rol al estado de roles
        setRoles([...roles, nombreRol]);
    };

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link><p>/ Permisos</p>
            </div>
            <div className='p-parraf'>
                <p>Seleccione un tipo de rol para modificar sus permisos</p>
            </div>
            
            <div className='select-input-container'>
                
                <div className='input-and-btn'>
                    <div className='select-input'>
                        <select name="Select" className='form-select form-select-lg mb-3' id="">
                            <option value="1">Administrador Empleados</option>
                            <option value="2">Reportes RRHH</option>
                            <option value="3">Reportes Directores</option>
                            <option value="4">Administrador Tablas Parametricas</option>
                            <option value="5">Administrador Usuarios</option>
                        </select>
                        <i></i>
                    </div>
                    <button className='btns-add' onClick={() => setModalOpen(true)}><FaPlus/>Agregar Rol</button>
                </div>
            </div>

            <div className='switches'>
            <div className='form-check form-switch'>
                    <p>Alta de Empleados</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Alta de Parametros</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Generacion de Reporte</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Baja de Empleados</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Baja de Parametros</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Modificacion de Empleados</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>
                <div className='form-check form-switch'>
                    <p>Modificaciones de Parametros</p>
                    <input type="checkbox" className='form-check-input' value="" id="check1" />
                </div>

                {/* Mapea sobre los roles y crea los elementos correspondientes */}
                {roles.map((rol, index) => (
                    <div key={index} className='form-check form-switch'>
                        <p>{rol}</p>
                        <input type='checkbox' className='form-check-input' value='' id={`check${index}`} />
                    </div>
                ))}
            </div>
            
            {modalOpen && <ModalAddSwitch closeModal={() => setModalOpen(false)} onSubmit={handleModalSubmit} />}

        </div>
    );
};