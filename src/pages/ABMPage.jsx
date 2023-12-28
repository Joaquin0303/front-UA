import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import TableWithSearch from '../components/table/TableWithSearch';
import i18n from "../localization/i18n";

const ABMPage = ({ pageConfiguration, pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey, setActive, matchHandler, statusActive }) => {

    let seccion;
    let to;

    if (pageName === 'Empleados' || pageName === 'Carga de familia' || pageName === 'Empleado externo' || pageName === 'Histial de licencia' || pageName === 'Historial de puesto' || pageName === 'Ingreso caido'){
        seccion = '/ Administracion de Empleados';
        to = '/administracion-empleados'}
    else if (pageName === 'Usuarios' || pageName === 'Roles' || pageName === 'Permisos'){
        seccion = '/ Administracion de Usuarios';
        to = '/administracion-usuarios'}
    else if (pageName === 'Tipo de Parámetro' || pageName === 'Parametros' || pageName === 'Secuenciador' || pageName === 'Puesto' || pageName === 'Países'){
        seccion = '/ Administracion de Parámetros';
        to = '/administracion-parametros'}
        
    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link> <Link to={to}>{seccion}</Link> <p>/ {i18n.t(pageName)}</p>
            </div>
            <TableWithSearch pageConfiguration={pageConfiguration} pageName={pageName} dataList={dataList} dataModel={dataModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey={searchKey} setActive={setActive} matchHandler={matchHandler} statusActive={statusActive} />
        </div>
    );
}

export default ABMPage;