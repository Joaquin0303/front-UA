import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/abm.css';
import TableWithSearch from '../components/table/TableWithSearch';

const ABMPage = ({ pageName, dataList, dataModel, onAdd, onEdit, onRemove, searchKey, setActive }) => {

    return (
        <div className='bloque-principal'>
            <div className="bloque-secundario">
                <Link to="/">Inicio</Link><p>/ {pageName}</p>
            </div>
            <TableWithSearch pageName={pageName} dataList={dataList} dataModel={dataModel} onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} searchKey={searchKey} setActive={setActive} />
        </div>
    );
}

export default ABMPage;