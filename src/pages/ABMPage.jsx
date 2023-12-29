import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import TableWithSearch from '../components/table/TableWithSearch';
import i18n from "../localization/i18n";

const ABMPage = ({ pageConfiguration, pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey, setActive, matchHandler, statusActive }) => {

    let seccion;
    let to;

    if (pageName === 'Empleados' || pageName === 'cargaDeFamilia' || pageName === 'external' || pageName === 'licenciaHistory' || pageName === 'cambioDePuesto' || pageName === 'ingresoCaido'){
        seccion = '/ Administracion de Empleados';
        to = '/administracion-empleados'}
    else if (pageName === 'usuarios' || pageName === 'roles' || pageName === 'permisos'){
        seccion = '/ Administracion de Usuarios';
        to = '/administracion-usuarios'}
    else if (pageName === 'tipoParametro' || pageName === 'parametros' || pageName === 'secuenciador' || pageName === 'puesto' || pageName === 'pais'){
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