import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import '../styles/abm.css'

import { FaPlus } from "react-icons/fa";

export const Permisos = () => {
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
                            <option value="2">Reportes Directores</option>
                            <option value="2">Administrador Tablas Parametricas</option>
                            <option value="2">Administrador Usuarios</option>
                        </select>
                        <i></i>
                    </div>
                    <button className='btns-add'><FaPlus/>Agregar Rol</button>
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

            </div>
            
        </div>
    )
}
