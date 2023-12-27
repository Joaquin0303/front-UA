import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import TableWithSearch from '../components/table/TableWithSearch';
import i18n from "../localization/i18n";

const ABMPage = ({ pageConfiguration, pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey, setActive, matchHandler, statusActive }) => {

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link><p>/ {i18n.t(pageName)}</p>
            </div>
            <TableWithSearch pageConfiguration={pageConfiguration} pageName={pageName} dataList={dataList} dataModel={dataModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey={searchKey} setActive={setActive} matchHandler={matchHandler} statusActive={statusActive} />
        </div>
    );
}

export default ABMPage;